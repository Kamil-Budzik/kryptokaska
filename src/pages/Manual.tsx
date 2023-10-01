import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import ManualSubFormSet from '../components/manual/manual-subform-set';
import { Inputs as NewReportInputs } from './NewReport';
import { Inputs } from '../components/manual/manual-subform';
import { Button } from '@mui/material';
import Wrapper from '../components/UI/Wrapper';
import { changeFormState } from '../store/crypto';
import { CryptoSummaryData, PDFSummaryData } from './PdfSummary';
import { WeighedMeanCalculator } from '../utils/weightedMean/WeighedMeanCalculator';
import { CurrencyConversionUtil } from '../utils/CurrencyConversionUtil';
import { useNavigate } from 'react-router-dom';


function Manual() {
  // const myData = useSelector((state) => state.myData);
  const crypto = useSelector((state: { newReport: NewReportInputs, crypto: PDFSummaryData }) => state.crypto);
  const manualState = useSelector((state: { newReport: NewReportInputs, crypto: PDFSummaryData }) => state.newReport);
  const [rateData, setRateData] = useState<Inputs[][]>([])
  const [errorMessage, setErrorMessage] = useState<string>()
  const [rate, _setRate] = useState<number>(4)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = (id: number) => (input: Inputs[]) => {
    console.log(id, input, rateData);

    setRateData((prev) => {
      prev[id] = input;
      return prev;
    });
  };

  useEffect(() => {
    (async () => {
      _setRate(await new CurrencyConversionUtil().nbpApi.getNBPCurrencyExchangeRate('A', "USD"));
    })
  }, []);

  const handleButtonClick = () => {

    const count = rateData.flatMap((rateData) => rateData).filter(item => item).length
    const desiredCount = manualState.cryptoAssets.filter(item => item.cryptoAsset).length * 3

    console.log(rateData, manualState);
    console.log(count, desiredCount);
    if (count !== desiredCount) {
      setErrorMessage("Wypełnij wszystkie pola")
      return;
    }

    const newData = rateData.map((rateData) => rateData.map((innerRateData) => {
      if (innerRateData.currency === "USD") {
        innerRateData.plnAmount = innerRateData.amount * rate;
      }
      return innerRateData;
    }));

    const summary = newData.map<CryptoSummaryData>((rateData, index) => {
      const cryptoSummary = {
        crypto: {
          fullName: manualState.cryptoAssets[index].cryptoAsset,
        },
        amount: +manualState.cryptoAssets[index].amountOfCryptoAsset,
        sources: rateData.map((rateData) => rateData.url),
        usdRate: rate,
        averageValue: new WeighedMeanCalculator().weightedPriceMean(rateData.map(data => ({
          OneDayPriceAverage: data.plnAmount || data.amount,
          OneDayVolumeAverage: data.volume,
          Currency: ""
        }))),
      }

      return cryptoSummary as CryptoSummaryData;
    })
    console.log({
      ...crypto,
      cryptoSummaryData: summary,
      stockMarketData: [],
    });

    dispatch(changeFormState({
      ...crypto,
      cryptoSummaryData: summary,
      stockMarketData: [],
    }));

    navigate("/pdf-summary")
  }

  // TODO: add styles and proper validation

  return (
    <Wrapper>
      {manualState.cryptoAssets.map((cryptoEntry, id) => (
        <ManualSubFormSet key={JSON.stringify(cryptoEntry) + "id"} onSubmit={handleSubmit(id)} rate={123} crypto={cryptoEntry}></ManualSubFormSet>
      ))}

      {/* Add submit button */}
      <div style={{ color: 'red' }}>{errorMessage}</div>
      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleButtonClick}
        style={{ backgroundColor: 'green', color: 'white' }}
      >
        Przejdź dalej
      </Button>
    </Wrapper>
  );
}

export default Manual;


