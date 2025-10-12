import { contextBridge, ipcRenderer } from 'electron'

console.log('🔍 PRELOAD SCRIPT IS RUNNING!')
console.log('🔍 contextBridge available:', !!contextBridge)
console.log('🔍 ipcRenderer available:', !!ipcRenderer)

// TypeScript types for renderer
interface TokenSet {
  accessToken: string
  refreshToken: string
  idToken: string
  expiresAt: number
}

declare global {
  interface Window {
    electronAPI: {
      ping: () => Promise<string>
      getAppVersion: () => Promise<string>
      auth: {
        login: () => Promise<void>
        getTokens: () => Promise<TokenSet | null>
      }
    }
  }
}

console.log('🔍 About to expose electronAPI to main world...')

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => ipcRenderer.invoke('ping'),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  auth: {
    login: () => ipcRenderer.invoke('auth:login'),
    getTokens: () => ipcRenderer.invoke('auth:get-tokens')
  }
})

console.log('✅ PRELOAD SCRIPT: electronAPI exposed successfully!')