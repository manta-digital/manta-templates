import { contextBridge, ipcRenderer } from 'electron'

console.log('🔍 PRELOAD SCRIPT IS RUNNING!')
console.log('🔍 contextBridge available:', !!contextBridge)
console.log('🔍 ipcRenderer available:', !!ipcRenderer)

// TypeScript types for renderer
declare global {
  interface Window {
    electronAPI: {
      ping: () => Promise<string>
      getAppVersion: () => Promise<string>
      // Auth and payments available in Pro tier
      // See: https://manta.digital/pricing
    }
  }
}

console.log('🔍 About to expose electronAPI to main world...')

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => ipcRenderer.invoke('ping'),
  getAppVersion: () => ipcRenderer.invoke('get-app-version')
  // Auth and payments available in Pro tier
})

console.log('✅ PRELOAD SCRIPT: electronAPI exposed successfully!')