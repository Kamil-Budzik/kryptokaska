import fs from "fs";
import path from "path";
import {headquarters} from "./statics/headquarters"

export interface CryptoEntry {
    id: string;
    fullName: string;
    shortName: string;
}

export interface Settings {
    logPath: string;
    avaibleCryptos: CryptoEntry[]
}

export class FileManager {
    private static readonly settingsFile = "settings.json";
    private static readonly settingsPath = "kryptokasa";
    private static readonly logFileName = "kryptokasa.log";

    private static settings: Settings

    private static join(...parts: string[]): string {
        return path.join(...parts);
    }

    private static getDefaulSettings(): Settings {
        return { 
            logPath: this.join(this.getSettingsPath(), this.logFileName),
            avaibleCryptos: [
                {
                    id: "1",
                    fullName: "Bitcoin",
                    shortName: "BTC"
                },
                {
                    id: "2",
                    fullName: "Ethereum",
                    shortName: "ETH"
                },
                {
                    id: "3",
                    fullName: "Manchester City Fan Token",
                    shortName: "CITY"
                }
            ]
        }
    }


    private static getSettingsFilePath() {        
        return this.join(this.getSettingsPath(),  this.settingsFile);
    }

    private static getSettingsPath() {
        return this.join(process.env.APPDATA || "C://", this.settingsPath);
    }

    public static updateLogPath(newPath: string) {
        const settings = this.getSettings();
        settings.logPath = this.join(newPath, this.logFileName);
        this.saveSettings(settings);
    }

    public static getSettings(): Settings {
        if(this.settings) {
            return this.settings;
        }
        
        const fullSettingsPath = this.getSettingsFilePath();
        const settingsPath = this.getSettingsPath();
        if(fs.existsSync(fullSettingsPath)) {
            const rawSettings = fs.readFileSync(fullSettingsPath, "utf8");
            return JSON.parse(rawSettings);
        }

        const settings = this.getDefaulSettings();
        if(!fs.existsSync(settingsPath)) {
            fs.mkdirSync(settingsPath);
        }
            
        this.saveSettings(settings);
        return settings;
    }

    public static saveSettings(settings: Settings) {
        this.settings = settings;

        const settingsPath = this.getSettingsFilePath();
        fs.writeFileSync(settingsPath, JSON.stringify(settings));
    }

    public static log(log: string) {
        const {logPath} = this.getSettings();

        if(!fs.existsSync(logPath)) {
            fs.writeFileSync(logPath, "");
        }

        fs.appendFileSync(logPath, log + "\n");
    }

    public static getAvaibleCryptos() {
        return this.getSettings().avaibleCryptos;
    }
    
   public static addAvaibleCrypto(crypto: CryptoEntry) {
        const settings = this.getSettings();

        if(!(crypto?.fullName?.length > 0 && crypto.shortName?.length > 0 && crypto.id?.length > 0)) {
            return;
        }
        
        if(settings.avaibleCryptos.some(c => c.shortName === crypto.shortName || c.id === crypto.id)) {
            return;
        }

        settings.avaibleCryptos.push(crypto);
        this.saveSettings(settings);
   }

    public static removeAvaibleCrypto(shortName: string) {
          const settings = this.getSettings();
          settings.avaibleCryptos = settings.avaibleCryptos.filter(crypto => crypto.shortName !== shortName);
          this.saveSettings(settings);
    }

    public static getHeadquarters(): string[] {
        return headquarters
    }

}