import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Electron Template</h1>
      <p>Your Electron + React app is running!</p>
      <button 
        onClick={async () => {
          const result = await (window as any).electronAPI.ping()
          alert(`IPC Test: ${result}`)
        }}
      >
        Test IPC
      </button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)