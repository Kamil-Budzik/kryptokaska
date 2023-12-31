import { BrowserWindow, Dialog, IpcMain, PrintToPDFOptions } from 'electron';
import fs from 'fs/promises';
import { CryptoEntry, FileManager, Settings } from './file-manager';
const pdfOptions: PrintToPDFOptions = {
  pageSize: 'A4',
  printBackground: false,
  landscape: false,
};

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
    const cryptos = FileManager.getAvailableCryptos();
    event.reply('available-cryptos', cryptos);
  });

  ipcMain.on('add-new-crypto', (_event, data: CryptoEntry) => {
    FileManager.addAvailableCrypto(data);
  });

  ipcMain.on('remove-available-crypto', (_event, data: string) => {
    FileManager.removeAvailableCrypto(data);
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

  ipcMain.on('load-headquarters', (event) => {
    const headquarters = FileManager.getHeadquarters();
    event.reply('headquarters-loaded', headquarters);
  });

  ipcMain.on('print-to-pdf', async (event, id) => {
    try {
      const currentDate = new Intl.DateTimeFormat('pl-PL').format(new Date())

      const pathToSave = await dialog.showSaveDialog(window, {
        title: 'Zapisz raport',
        defaultPath: `raport-${currentDate}-${id}.pdf`,
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
      });

      if (!pathToSave.canceled) {
        const pdfResult = await window.webContents.printToPDF(pdfOptions);
        await fs.writeFile(pathToSave.filePath ?? '', pdfResult);
        event.reply('print-success');
      } else {
        event.reply('print-canceled');
      }
    } catch (error) {
      console.log(error);
      event.reply('print-failed');
    }
  });
};
