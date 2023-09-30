export class ExchangeData {
    private readonly cryptocurrency: string;
    private readonly volume24h: number;
    private readonly averageValue24h: number;

    constructor(cryptocurrency: string, volume24h: number, averageValue24h: number) {
        this.cryptocurrency = cryptocurrency;
        this.volume24h = volume24h;
        this.averageValue24h = averageValue24h;
    }

    // Getters
    getCryptocurrency(): string {
        return this.cryptocurrency;
    }

    getVolume24h(): number {
        return this.volume24h;
    }

    getAverageValue24h(): number {
        return this.averageValue24h;
    }

    describe(): string {
        return `The cryptocurrency ${this.cryptocurrency} has a volume of 
        ${this.volume24h} and an average value of ${this.averageValue24h} 
        over the last 24 hours.`;
    }
}
