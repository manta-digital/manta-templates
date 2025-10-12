// Load environment variables FIRST before any other imports
import { config } from 'dotenv'
config() // Load .env file into process.env

import { app, BrowserWindow, ipcMain, shell, Menu } from 'electron'
import { fileURLToPath } from 'node:url'
import { URL } from 'node:url'
import { registerAppProtocol, setupAppProtocolHandler } from './protocol-handler'
import { isAuthEnabled } from './auth/auth0-config'

// Conditionally import auth modules only if enabled
let registerAuthProtocol: (() => void) | undefined
let setupAuthProtocolHandler: (() => void) | undefined
let auth0Client: any

if (isAuthEnabled) {
  const authProtocol = await import('./auth/protocol-handler')
  const authClient = await import('./auth/auth0-client')
  registerAuthProtocol = authProtocol.registerAuthProtocol
  setupAuthProtocolHandler = authProtocol.setupAuthProtocolHandler
  auth0Client = authClient.auth0Client
}

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
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: fileURLToPath(new URL('../preload/preload.cjs', import.meta.url)),
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

  // Basic IPC example
  ipcMain.handle('ping', () => {
    return 'pong'
  })

  ipcMain.handle('get-app-version', () => {
    return app.getVersion()
  })

  // Auth IPC handlers (only if auth is enabled)
  if (isAuthEnabled && auth0Client) {
    ipcMain.handle('auth:login', async () => {
      await auth0Client.login()
    })

    ipcMain.handle('auth:get-tokens', () => {
      return auth0Client.getTokens()
    })
  } else {
    // Return disabled message if auth is not enabled
    ipcMain.handle('auth:login', async () => {
      throw new Error('Auth is not enabled. Set AUTH_ENABLED=true in .env')
    })

    ipcMain.handle('auth:get-tokens', () => {
      return null
    })
  }

  // Load renderer based on environment
  // Development: use Vite dev server at localhost:5173
  // Production: use app:// protocol to load from packaged resources
  if (process.env.ELECTRON_RENDERER_URL) {
    // Development mode with Vite dev server
    win.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else if (process.env.NODE_ENV === 'production') {
    // Production mode with app:// protocol
    // Use app://./index.html to ensure relative URLs resolve correctly
    win.loadURL('app://./index.html')
  } else {
    // Fallback for production build testing without NODE_ENV
    win.loadURL('app://./index.html')
  }
}

// Must register custom protocols before app is ready
registerAppProtocol()
if (isAuthEnabled && registerAuthProtocol) {
  registerAuthProtocol()
}

app.whenReady().then(() => {
  process.env.ELECTRON_ENABLE_SECURITY_WARNINGS = 'true'

  // Set up auth protocol handler for macOS (only if auth enabled)
  if (isAuthEnabled && setupAuthProtocolHandler) {
    setupAuthProtocolHandler()
  }

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

  // Register app:// protocol handler for production builds
  setupAppProtocolHandler()

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