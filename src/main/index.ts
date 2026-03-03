import { spawn } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { app, BrowserWindow, ipcMain, Menu, nativeImage, Tray } from "electron";
import { VALID_STATES } from "../common/types";
import type { ClaudeInstance } from "../common/types";
import { startServer } from "./server";
import { getInstances, updateInstanceState } from "./state";

interface AppSettings {
  loginItemInitialized?: boolean;
  alwaysOnTop?: boolean;
}

function getSettingsPath(): string {
  return join(app.getPath("userData"), "settings.json");
}

function readSettings(): AppSettings {
  const path = getSettingsPath();
  if (!existsSync(path)) return {};
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    return {};
  }
}

function writeSettings(settings: AppSettings): void {
  writeFileSync(getSettingsPath(), JSON.stringify(settings));
}

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined;
declare const MAIN_WINDOW_VITE_NAME: string;

if (!app.isPackaged) {
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
}

let tray: Tray | null = null;
let win: BrowserWindow | null = null;
let alwaysOnTop = false; // hydrated from settings in bootstrap()

function createTrayIcon(): Tray {
  const img = nativeImage.createFromPath(
    join(getResourcePath(), "iconTemplate.png"),
  );
  img.setTemplateImage(true);
  return new Tray(img);
}

function createWindow(): BrowserWindow {
  const window = new BrowserWindow({
    width: MIN_WIDTH,
    height: 400,
    show: false,
    frame: false,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    window.loadFile(
      join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  window.on("blur", () => {
    if (!alwaysOnTop) window.hide();
  });

  return window;
}

function toggleWindow() {
  if (!win) return;
  if (win.isVisible()) {
    win.hide();
    return;
  }
  const trayBounds = tray!.getBounds();
  const winBounds = win.getBounds();
  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - winBounds.width / 2,
  );
  const y = trayBounds.y + trayBounds.height + 4;
  win.setPosition(x, y, false);
  win.show();
  win.focus();
}

const CAT_WIDTH = 58; // 50px avatar + 8px gap
const PADDING_H = 48; // container 16*2 + row 8*2
const CHAR_WIDTH = 6.6; // 11px monospace ≈ 6.6px per char
const MIN_WIDTH = 100;
const MAX_WIDTH = 800;

function resizeToFit() {
  if (!win || win.isDestroyed()) return;
  const all = getInstances();
  if (all.length === 0) {
    win.setSize(MIN_WIDTH, 120, true);
    return;
  }
  const groups = new Map<string, number>();
  let longestLabel = 0;
  for (const inst of all) {
    groups.set(inst.project, (groups.get(inst.project) ?? 0) + 1);
    if (inst.project.length > longestLabel) longestLabel = inst.project.length;
  }
  const maxCats = Math.max(...groups.values());
  const catsWidth = maxCats * CAT_WIDTH - 8 + PADDING_H;
  const labelWidth = longestLabel * CHAR_WIDTH + PADDING_H;
  const width = Math.min(MAX_WIDTH, Math.max(catsWidth, labelWidth));
  const height = Math.min(800, groups.size * 97 + (groups.size - 1) * 8 + 30);
  win.setSize(Math.max(MIN_WIDTH, Math.ceil(width)), height, true);
}

function getResourcePath() {
  return app.isPackaged
    ? join(process.resourcesPath, "resources")
    : join(__dirname, "../../resources");
}

function playMeow() {
  const soundPath = join(getResourcePath(), "meow.mp3");
  spawn("afplay", [soundPath], { stdio: "ignore" }).unref();
}

function notifyRenderer() {
  if (win && !win.isDestroyed()) {
    win.webContents.send("instances-changed", getInstances());
    resizeToFit();
  }
}

function setupIpc() {
  ipcMain.handle("get-instances", () => getInstances());

  ipcMain.handle("update-instance-state", (_e, id: string, state: string) => {
    if (!VALID_STATES.includes(state as ClaudeInstance["state"])) return null;
    const result = updateInstanceState(id, state as ClaudeInstance["state"]);
    if (
      result &&
      state === "waiting_for_input" &&
      result.previousState !== "waiting_for_input"
    ) {
      playMeow();
    }
    notifyRenderer();
    return result?.instance ?? null;
  });

  ipcMain.handle("focus-instance", () => playMeow());
}

async function bootstrap() {
  // Hide dock icon on macOS
  if (process.platform === "darwin") {
    app.dock.hide();
  }

  await app.whenReady();

  const settings = readSettings();
  alwaysOnTop = settings.alwaysOnTop ?? false;

  if (app.isPackaged && !settings.loginItemInitialized) {
    app.setLoginItemSettings({ openAtLogin: true });
    writeSettings({ ...settings, loginItemInitialized: true });
  }

  setupIpc();
  startServer(notifyRenderer, playMeow);

  tray = createTrayIcon();
  win = createWindow();
  if (alwaysOnTop) win.setAlwaysOnTop(true);
  resizeToFit();

  tray.on("click", toggleWindow);
  tray.on("right-click", () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Always on Top",
        type: "checkbox",
        checked: alwaysOnTop,
        click: () => {
          alwaysOnTop = !alwaysOnTop;
          win?.setAlwaysOnTop(alwaysOnTop);
          const s = readSettings();
          writeSettings({ ...s, alwaysOnTop });
        },
      },
      {
        label: "Launch at Login",
        type: "checkbox",
        checked: app.getLoginItemSettings().openAtLogin,
        click: (menuItem) => {
          app.setLoginItemSettings({ openAtLogin: menuItem.checked });
          const s = readSettings();
          writeSettings({ ...s, loginItemInitialized: true });
        },
      },
      { type: "separator" },
      { label: "Quit", click: () => app.quit() },
    ]);
    tray!.popUpContextMenu(contextMenu);
  });

  if (!app.isPackaged) {
    process.on("SIGTERM", () => app.exit());
  }
}

bootstrap().catch((err) => {
  console.error(err);
  app.quit();
});
