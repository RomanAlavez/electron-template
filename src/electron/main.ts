import { app, BrowserWindow, Menu } from 'electron';
import { ipcMainHandle, ipcMainOn, isDev } from './util.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import { createTray } from './tray.js';
import { createMenu } from './menu.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    // disables default system frame (dont do this if you want a proper working menu bar)
    frame: true,
  });
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(getUIPath());
  }



  ipcMainHandle('ping', () => {
    return 'pong';
  });

  ipcMainOn('sendFrameAction', (payload) => {
    switch (payload) {
      case 'CLOSE':
        mainWindow.close();
        break;
      case 'MAXIMIZE':
        mainWindow.maximize();
        break;
      case 'MINIMIZE':
        mainWindow.minimize();
        break;
      case 'RELOAD':
        mainWindow.reload();
        break;
    }
  });

  createTray(mainWindow);
  handleCloseEvents(mainWindow);
  createMenu(mainWindow);
});

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on('close', (e) => {
    if (willClose) {
      return; // Si ya estamos en proceso de cerrar la app, entonces no hacemos nada
    }
    // e.preventDefault(); // Prevenimos el cierre de la ventana

    // // Si el evento es de cierre, pero no queremos salir completamente:
    // mainWindow.hide();
    // if (app.dock) {
    //   app.dock.hide(); // Ocultamos del Dock si estamos en macOS
    // }
  });

  app.on('before-quit', () => {
    willClose = true; // Permitimos el cierre completo de la aplicación
  });

  // Si el mainWindow se muestra nuevamente, restablecemos willClose
  mainWindow.on('show', () => {
    willClose = false;
  });
}
