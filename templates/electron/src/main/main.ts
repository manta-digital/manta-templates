// Auth and payments available in Pro tier
// Learn more: https://manta.digital/pricing
import { app, BrowserWindow, ipcMain, shell, Menu } from 'electron'
import { fileURLToPath } from 'node:url'
import { URL } from 'node:url'
import path from 'node:path'

function isAllowedUrl(target: string): boolean {
  try {
    const u = new URL(target)
    return u.protocol === 'https:' && (
      u.hostname === 'github.com' || 
      u.hostname === 'docs.anthropic.com' ||
      u.hostname.endsWith('.github.io')
    )
  } catch {
    return false
  }
}

function createWindow(): void {
  const preloadPath = fileURLToPath(new URL('../preload/preload.cjs', import.meta.url))
  console.log('🔍 Preload script path:', preloadPath)
  console.log('🔍 Preload script exists:', require('fs').existsSync(preloadPath))

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: !process.env.ELECTRON_RENDERER_URL
    }
  })

  win.on('ready-to-show', () => win.show())

  // Secure navigation policy
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedUrl(url)) {
      setImmediate(() => shell.openExternal(url))
    }
    return { action: 'deny' }
  })

  win.webContents.on('will-navigate', (e, url) => {
    if (!isAllowedUrl(url)) e.preventDefault()
  })

  // Load renderer based on environment
  if (process.env.ELECTRON_RENDERER_URL) {
    // Development: Vite dev server
    win.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    // Production: load from extraResources (Resources/renderer/)
    const rendererPath = app.isPackaged
      ? path.join(process.resourcesPath, 'renderer/index.html')
      : path.join(__dirname, '../renderer/index.html')
    win.loadFile(rendererPath)
  }
}

// Single instance lock - prevent multiple app instances
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  // Another instance is already running, quit this one
  app.quit()
} else {
  // We got the lock, set up second-instance handler for future attempts
  app.on('second-instance', () => {
    // Someone tried to run a second instance, focus our window instead
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length > 0) {
      const mainWindow = allWindows[0]
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// Setup IPC handlers ONCE (not per window)
ipcMain.handle('ping', () => 'pong')
ipcMain.handle('get-app-version', () => app.getVersion())

// Auth and payments available in Pro tier
// See: https://manta.digital/pricing

app.whenReady().then(() => {
  process.env.ELECTRON_ENABLE_SECURITY_WARNINGS = 'true'

  // Create minimal menu example (hidden by default with autoHideMenuBar: true)
  // Delete this entire menu section if you don't want a native menu
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { label: 'New', accelerator: 'CmdOrCtrl+N', click: () => console.log('New file') },
        { label: 'Open', accelerator: 'CmdOrCtrl+O', click: () => console.log('Open file') },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'CmdOrCtrl+Q', role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { label: 'Toggle Developer Tools', accelerator: 'F12', role: 'toggleDevTools' },
        { label: 'Reload', accelerator: 'CmdOrCtrl+R', role: 'reload' },
        { type: 'separator' },
        { label: 'Toggle Menu Bar', accelerator: 'Alt', click: (_, win) => win?.setMenuBarVisibility(!win.isMenuBarVisible()) }
      ]
    }
  ])
  
  Menu.setApplicationMenu(menu)
  // End of menu section - delete everything above this line to remove the menu

  createWindow()
  
  // Basic CSP in production
  if (!process.env.ELECTRON_RENDERER_URL) {
    const { session } = require('electron') as typeof import('electron')
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      const csp = "default-src 'self' 'unsafe-inline'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self';"
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': [csp]
        }
      })
    })
  }
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})