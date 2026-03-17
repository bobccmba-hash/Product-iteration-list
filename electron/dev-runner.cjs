const childProcess = require("child_process");
const net = require("net");
const electronBinary = require("electron");

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
  for (let port = 3000; port <= 3010; port += 1) {
    // eslint-disable-next-line no-await-in-loop
    const ok = await canConnect(port);
    if (ok) return `http://127.0.0.1:${port}`;
  }
  return null;
}

function spawnElectron(extraEnv) {
  const env = { ...process.env, ...extraEnv };
  delete env.ELECTRON_RUN_AS_NODE;
  const child = childProcess.spawn(electronBinary, ["."], {
    stdio: "inherit",
    shell: process.platform === "win32",
    env,
  });
  child.on("exit", (code) => process.exit(code ?? 0));
}

function spawnNextDev() {
  return childProcess.spawn("npx", ["next", "dev", "-H", "127.0.0.1"], {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: process.env,
  });
}

async function main() {
  const existing = await detectDevUrl();
  if (existing) {
    spawnElectron({ ELECTRON_RENDERER_URL: existing });
    return;
  }

  const nextDev = spawnNextDev();
  let startedUrl = null;

  const probe = async () => {
    startedUrl = await detectDevUrl();
    if (startedUrl) {
      spawnElectron({ ELECTRON_RENDERER_URL: startedUrl });
      return;
    }
    setTimeout(probe, 500);
  };

  probe();

  nextDev.on("exit", (code) => {
    if (code && code !== 0) process.exit(code);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

