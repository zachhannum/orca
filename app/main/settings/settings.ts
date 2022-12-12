import fs from 'fs';
import path from 'path';
import { app, BrowserWindow } from 'electron';
import { Settings } from 'types/types';

const settingsPath = path.join(app.getPath('appData'), 'settings.json');

export const saveSettings = (settings: Settings) => {
  fs.writeFile(settingsPath, JSON.stringify(settings), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const openSettings = (mainWindow: BrowserWindow) => {
  fs.readFile(settingsPath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const settings = JSON.parse(data.toString());
      mainWindow.webContents.send('onSettings', settings);
    }
  });
};
