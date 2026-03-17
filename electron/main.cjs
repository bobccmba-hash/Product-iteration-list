const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const net = require("net");
const childProcess = require("child_process");
const fs = require("fs");

const isDev = !app.isPackaged;
const devUrlFromEnv = process.env.ELECTRON_RENDERER_URL;

let mainWindow = null;

function logLine(message) {
  try {
    const logDir = app.getPath("userData");
    const logPath = path.join(logDir, "main.log");
    fs.mkdirSync(logDir, { recursive: true });
    fs.appendFileSync(logPath, `${new Date().toISOString()} ${message}\n`);
  } catch {
    // ignore logging failures
  }
}

process.on("uncaughtException", (err) => {
  logLine(`uncaughtException: ${err?.stack || err}`);
});

process.on("unhandledRejection", (err) => {
  logLine(`unhandledRejection: ${err?.stack || err}`);
});

function canConnect(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ host: "127.0.0.1", port }, () => {
      socket.end();
      resolve(true);
    });
    socket.on("error", () => resolve(false));
  });
}

async function detectDevUrl() {
  if (devUrlFromEnv) return devUrlFromEnv;
  for (let port = 3000; port <= 3010; port += 1) {
    // eslint-disable-next-line no-await-in-loop
    const ok = await canConnect(port);
    if (ok) return `http://127.0.0.1:${port}`;
  }
  return null;
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

function waitForPort(port, { timeoutMs = 15000 } = {}) {
  const startedAt = Date.now();
  return new Promise((resolve, reject) => {
    const tick = async () => {
      const ok = await canConnect(port);
      if (ok) return resolve(true);
      if (Date.now() - startedAt > timeoutMs) return reject(new Error(`timeout waiting for port ${port}`));
      setTimeout(tick, 200);
    };
    tick();
  });
}

function startNextServer(port) {
  const appPath = app.getAppPath();
  const standaloneDir = path.join(appPath, ".next", "standalone");
  const serverJs = path.join(standaloneDir, "server.js");

  logLine(`Starting Next standalone: ${serverJs} (cwd=${standaloneDir}) port=${port}`);

  // In Electron, process.execPath is the Electron binary.
  // To run a Node script in a child process, we must enable "run as node".
  const child = childProcess.spawn(process.execPath, [serverJs], {
    cwd: standaloneDir,
    env: { ...process.env, ELECTRON_RUN_AS_NODE: "1", NODE_ENV: "production", HOSTNAME: "127.0.0.1", PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.stdout.on("data", (buf) => logLine(`[next stdout] ${String(buf).trimEnd()}`));
  child.stderr.on("data", (buf) => logLine(`[next stderr] ${String(buf).trimEnd()}`));

  child.on("exit", (code, signal) => {
    logLine(`Next server exited code=${code} signal=${signal}`);
  });

  return child;
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  mainWindow = win;
  win.once("ready-to-show", () => win.show());

  if (isDev) {
    const url = await detectDevUrl();
    if (!url) {
      dialog.showErrorBox("未检测到开发服务", "请先运行 `npm run dev`（或占用 3000-3010 端口的 Next dev 服务），再执行桌面启动。");
      app.quit();
      return { win, serverProcess: null };
    }
    logLine(`DEV loadURL ${url}`);
    await win.loadURL(url);
    return { win, serverProcess: null };
  }

  const port = await getFreePort();
  const serverProcess = startNextServer(port);
  const url = `http://127.0.0.1:${port}`;

  try {
    await waitForPort(port, { timeoutMs: 20000 });
    logLine(`PROD loadURL ${url}`);
    await win.loadURL(url);
  } catch (err) {
    logLine(`Failed to start server: ${err?.stack || err}`);
    dialog.showErrorBox("应用启动失败", `本地服务启动失败。\n\n请查看日志：${path.join(app.getPath("userData"), "main.log")}`);
    app.quit();
  }
  return { win, serverProcess };
}

let serverProcess = null;

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
  app.whenReady().then(async () => {
    logLine(`App ready. isPackaged=${app.isPackaged}`);
    const result = await createWindow();
    serverProcess = result.serverProcess;

    app.on("activate", async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        const r = await createWindow();
        serverProcess = r.serverProcess;
      }
    });
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
});

