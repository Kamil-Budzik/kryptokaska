import fs from "fs";
import path from "path";
import { headquarters } from "./statics/headquarters";
export class FileManager {
    static join(...parts) {
        return path.join(...parts);
    }
    static getDefaultSettings() {
        return {
            logPath: this.join(this.getSettingsPath(), this.logFileName),
            availableCryptos: [
                {
                    id: '1',
                    fullName: 'Bitcoin',
                    shortName: 'BTC',
                },
                {
                    id: '2',
                    fullName: 'Ethereum',
                    shortName: 'ETH',
                },
                {
                    id: '3',
                    fullName: 'Manchester City Fan Token',
                    shortName: 'CITY',
                },
            ],
        };
    }
    static getSettingsFilePath() {
        return this.join(this.getSettingsPath(), this.settingsFile);
    }
    static getSettingsPath() {
        return this.join(process.env.APPDATA || 'C://', this.settingsPath);
    }
    static updateLogPath(newPath) {
        const settings = this.getSettings();
        settings.logPath = this.join(newPath, this.logFileName);
        this.saveSettings(settings);
    }
    static getSettings() {
        if (this.settings) {
            return this.settings;
        }
        const fullSettingsPath = this.getSettingsFilePath();
        const settingsPath = this.getSettingsPath();
        if (fs.existsSync(fullSettingsPath)) {
            const rawSettings = fs.readFileSync(fullSettingsPath, 'utf8');
            return JSON.parse(rawSettings);
        }
        const settings = this.getDefaultSettings();
        if (!fs.existsSync(settingsPath)) {
            fs.mkdirSync(settingsPath);
        }
        this.saveSettings(settings);
        return settings;
    }
    static saveSettings(settings) {
        this.settings = settings;
        const settingsPath = this.getSettingsFilePath();
        fs.writeFileSync(settingsPath, JSON.stringify(settings));
    }
    static log(log) {
        const { logPath } = this.getSettings();
        if (!fs.existsSync(logPath)) {
            fs.writeFileSync(logPath, '');
        }
        const date = new Date();
        fs.appendFileSync(logPath, `${date.toLocaleString()} - ${log}\n`);
    }
    static getAvailableCryptos() {
        return this.getSettings().availableCryptos;
    }
    static addAvailableCrypto(crypto) {
        const settings = this.getSettings();
        if (!(crypto?.fullName?.length > 0 &&
            crypto.shortName?.length > 0 &&
            crypto.id?.length > 0)) {
            return;
        }
        if (settings.availableCryptos.some((c) => c.shortName === crypto.shortName || c.id === crypto.id)) {
            return;
        }
        settings.availableCryptos.push(crypto);
        this.saveSettings(settings);
    }
    static removeAvailableCrypto(shortName) {
        const settings = this.getSettings();
        settings.availableCryptos = settings.availableCryptos.filter((crypto) => crypto.shortName !== shortName);
        this.saveSettings(settings);
    }
    static getHeadquarters() {
        return headquarters;
    }
}
Object.defineProperty(FileManager, "settingsFile", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'settings.json'
});
Object.defineProperty(FileManager, "settingsPath", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'kryptokasa'
});
Object.defineProperty(FileManager, "logFileName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'kryptokasa.log'
});
