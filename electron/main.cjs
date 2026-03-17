const { app, BrowserWindow } = require("electron");
const path = require("path");
const net = require("net");
const childProcess = require("child_process");

const isDev = !app.isPackaged;
const devUrl = process.env.ELECTRON_RENDERER_URL || "http://127.0.0.1:3000";

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

function startNextServer(port) {
  const appPath = app.getAppPath();
  const nextBin = path.join(appPath, "node_modules", "next", "dist", "bin", "next");

  const child = childProcess.spawn(process.execPath, [nextBin, "start", "-H", "127.0.0.1", "-p", String(port)], {
    cwd: appPath,
    env: { ...process.env, NODE_ENV: "production" },
    stdio: "inherit",
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

  win.once("ready-to-show", () => win.show());

  if (isDev) {
    await win.loadURL(devUrl);
    return { win, serverProcess: null };
  }

  const port = await getFreePort();
  const serverProcess = startNextServer(port);
  const url = `http://127.0.0.1:${port}`;

  await win.loadURL(url);
  return { win, serverProcess };
}

let serverProcess = null;

app.whenReady().then(async () => {
  const result = await createWindow();
  serverProcess = result.serverProcess;

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const r = await createWindow();
      serverProcess = r.serverProcess;
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
});

