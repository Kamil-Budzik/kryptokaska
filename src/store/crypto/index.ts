import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PDFSummaryData } from '../../pages/PdfSummary';

export interface NewReportState {
  enforcementAuthority: string;
  caseNumber: string;
  cryptoCurrencyOwnerData: string;
  cryptoAssets: { cryptoAsset: string; amountOfCryptoAsset: string }[];
}

const initialState: PDFSummaryData = {
  generalData: [{
      name: "id",
      value: "qwertyuio"
  }, {
      name: "Data utworzenia",
      value: "03.09.2001"
  }, {
      name: "Numer Sprawy",
      value: "qwertyuio"
  },
  {
      name: "Dane właściciela",
      value: "qwertyuio"
  },
  ],
  cryptoSummaryData: [
      {
          crypto: {
              id: "1",
              fullName: "Bitcoin",
              shortName: "BTC"
          },
          amount: 1.5,
          sources: ["Coinbase", "Binance"],
          usdRate: 50000,
          averageValue: 75000
      },
      {
          crypto: {
              id: "2",
              fullName: "Ethereum",
              shortName: "ETH"
          },
          amount: 10,
          sources: ["Kraken", "Gemini"],
          usdRate: 3000,
          averageValue: 3500
      }
  ],
  stockMarketData: [
      {
          marketName: "NASDAQ",
          data: [
              {
                  crypto: {
                      id: "1",
                      fullName: "Bitcoin",
                      shortName: "BTC"
                  },
                  isAvaible: true,
                  rate: 50000,
                  currency: "USD",
                  valueInPLN: 123123,
                  totalValue: 250000
              },
              {
                  crypto: {
                      id: "2",
                      fullName: "Ethereum",
                      shortName: "ETH"
                  },
                  isAvaible: false,
                  rate: 3000,
                  currency: "USD",
                  valueInPLN: 1236,
                  totalValue: 0
              }
          ]
      },
      {
          marketName: "NYSE",
          data: [
              {
                  crypto: {
                      id: "1",
                      fullName: "Bitcoin",
                      shortName: "BTC"
                  },
                  isAvaible: true,
                  rate: 50000,
                  currency: "USD",
                  valueInPLN: 1233,
                  totalValue: 250000
              },
              {
                  crypto: {
                      id: "2",
                      fullName: "Ethereum",
                      shortName: "ETH"
                  },
                  isAvaible: true,
                  rate: 3000,
                  currency: "USD",
                  valueInPLN: 123,
                  totalValue: 30000
              }
          ]
      }
  ]
};  

export const newReportSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    changeFormState: (state, action: PayloadAction<PDFSummaryData>) => {
      console.log(action.payload);
      state.cryptoSummaryData = action.payload.cryptoSummaryData;
      state.generalData = action.payload.generalData;
      state.stockMarketData = action.payload.stockMarketData;
    },
  },
});

export const { changeFormState } = newReportSlice.actions;

export default newReportSlice.reducer;
