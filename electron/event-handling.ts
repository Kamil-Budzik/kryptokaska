import { BrowserWindow, Dialog, IpcMain } from 'electron';
import { CryptoEntry, FileManager, Settings } from '../src/utils/fileManager';

export const addEventListeners = (
  window: BrowserWindow,
  ipcMain: IpcMain,
  dialog: Dialog,
) => {
  ipcMain.on('save-settings', (_event, data: Settings) => {
    console.log(data);
    FileManager.saveSettings(data);
  });

  ipcMain.on('load-settings', (event) => {
    const settings = FileManager.getSettings();
    event.reply('settings-loaded', settings);
  });

  ipcMain.on('add-log', (_event, data: string) => {
    FileManager.log(data);
  });

  ipcMain.on('get-available-cryptos', (event) => {
    const cryptos = FileManager.getAvaibleCryptos();
    event.reply('avaible-cryptos', cryptos);
  });

  ipcMain.on('add-new-crypto', (_event, data: CryptoEntry) => {
    FileManager.addAvaibleCrypto(data);
  });

  ipcMain.on('remove-available-crypto', (_event, data: string) => {
    FileManager.removeAvaibleCrypto(data);
  });

  ipcMain.on('update-log-path', (_event, data: string) => {
    FileManager.updateLogPath(data);
  });

  ipcMain.on('select-folder', async (event) => {
    const result = await dialog.showOpenDialog(window, {
      title: 'Wybierz folder do zapisu',
      properties: ['openDirectory'],
    });

    if (!result.canceled) {
      const selectedFolder = result.filePaths[0];
      event.reply('folder-selected', selectedFolder);
    }
  });
};
