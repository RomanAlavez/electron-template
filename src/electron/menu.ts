import { BrowserWindow, Menu, app } from 'electron';
import { ipcWebContentsSend, isDev } from './util.js';

export function createMenu(mainWindow: BrowserWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: process.platform === 'darwin' ? undefined : 'App',
        type: 'submenu',
        submenu: [
          {
            label: 'Quit',
            click: app.quit,
          },
          {
            label: 'DevTools',
            click: () => mainWindow.webContents.openDevTools(),
            visible: isDev(),
          },
          {
            label: 'Reload',
            click: () => mainWindow.reload(),
          },
        ],
      },
      {
        label: 'Options',
        type: 'submenu',
        submenu: [
          {
            label: 'First option',
            click: () =>
              ipcWebContentsSend('changeView', mainWindow.webContents, 'CPU'),
          },
          {
            label: 'Second Option',
            click: () =>
              ipcWebContentsSend('changeView', mainWindow.webContents, 'RAM'),
          },
          {
            label: 'Third option',
            click: () =>
              ipcWebContentsSend(
                'changeView',
                mainWindow.webContents,
                'STORAGE'
              ),
          },
        ],
      },
    ])
  );
}
