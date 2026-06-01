const { app, BrowserWindow, session, systemPreferences, ipcMain, shell } = require('electron')
const path = require('path')

// Request mic permission on macOS before window opens
async function requestMicPermission() {
  if (process.platform === 'darwin') {
    const status = systemPreferences.getMediaAccessStatus('microphone')
    if (status !== 'granted') {
      await systemPreferences.askForMediaAccess('microphone')
    }
  }
}

async function createWindow() {
  await requestMicPermission()

  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',   // native macOS traffic lights, no title bar
    backgroundColor: '#000000',
    vibrancy: 'under-window',
    visualEffectState: 'active',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      // Allow speech recognition and microphone
      allowRunningInsecureContent: false,
    },
    icon: path.join(__dirname, 'icon.icns'),
  })

  // Grant mic permission to the renderer automatically
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowed = ['media', 'microphone', 'audioCapture']
    callback(allowed.includes(permission))
  })

  session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
    const allowed = ['media', 'microphone', 'audioCapture']
    return allowed.includes(permission)
  })

  // Open external links in the default browser, not in Electron
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('file://')) {
      e.preventDefault()
      shell.openExternal(url)
    }
  })

  win.loadFile('index.html')

  // Uncomment to open DevTools for debugging:
  // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// Handle opening links from renderer
ipcMain.on('open-external', (_, url) => {
  shell.openExternal(url)
})
