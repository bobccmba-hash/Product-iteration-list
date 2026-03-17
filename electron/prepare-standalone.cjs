const fs = require("fs");
const path = require("path");

function rmIfExists(p) {
  try {
    fs.rmSync(p, { recursive: true, force: true });
  } catch {
    // ignore
  }
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true, force: true });
}

function main() {
  const root = process.cwd();
  const standaloneDir = path.join(root, ".next", "standalone");
  const serverJs = path.join(standaloneDir, "server.js");
  if (!fs.existsSync(serverJs)) {
    throw new Error("Missing .next/standalone/server.js. Run `next build` first.");
  }

  // Next standalone expects these paths relative to .next/standalone (because server.js chdir(__dirname)):
  // - .next/static
  // - public
  const srcStatic = path.join(root, ".next", "static");
  const destStatic = path.join(standaloneDir, ".next", "static");
  rmIfExists(destStatic);
  copyDir(srcStatic, destStatic);

  const srcPublic = path.join(root, "public");
  const destPublic = path.join(standaloneDir, "public");
  if (fs.existsSync(srcPublic)) {
    rmIfExists(destPublic);
    copyDir(srcPublic, destPublic);
  }
}

main();

