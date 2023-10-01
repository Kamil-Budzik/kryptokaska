import {useState, useEffect} from 'react';
import axios from 'axios';

interface Props {
    cryptoSymbol: string;
}

interface DirectionalMovementIndex {
    adx: number;
    pdi: number;
    mdi: number;
}

const SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbHVlIjoiNjUxOGVkYmU0OThkNzVkYTM2ZjUzNWNiIiwiaWF0IjoxNjk2MTMyNzc2LCJleHAiOjMzMjAwNTk2Nzc2fQ.ocAhxIco8Rt7C3--6OrMY7G3_mYA_bkigOoFCVWg5hE"

function CheckCryptoTechnicalAnalysis(props: Props) {
    const [technicalAnalysis, setTechnicalAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTechnicalAnalysis();
    }, [fetchTechnicalAnalysis, props.cryptoSymbol]);

    function analyzeDmi(dmi: DirectionalMovementIndex) {
        console.log("entering analyzeDmi");
        console.log(dmi);
        if (dmi.adx <= 20)
            setTechnicalAnalysis('noTrend');
        else if (dmi.pdi > dmi.mdi)
            setTechnicalAnalysis('positive');
        else if (dmi.pdi < dmi.mdi)
            setTechnicalAnalysis('negative');

    }

    async function fetchTechnicalAnalysis() {
        const url = `https://api.taapi.io/dmi?secret=${SECRET_KEY}&exchange=binance&symbol=${props.cryptoSymbol}/PLN&interval=1d`;
        try {
            const response = await axios.get(url);
            console.log("get call response:");
            console.log(response.data);
            const dmi = response.data;

            if (dmi.adx && dmi.pdi > dmi.mdi) {
                analyzeDmi(dmi);
            }
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch technical analysis.');
            setLoading(false);
        }
    }

    function interpretAnalysis(analysis: string | null): string {
        switch (analysis) {
            case 'positive':
                return `Analiza techniczna wykazała, że jest pozytywny trend na parze walutowej ${props.cryptoSymbol}/PLN. Zalecane jest poczekanie ze sprzedażą.`
            case 'negative':
                return `Analiza techniczna wykazała, że jest negatywny trend na parze walutowej ${props.cryptoSymbol}/PLN. Zalecana jest sprzedaż.`;
            case 'noTrend':
                return `Analiza techniczna wykazała, że nie ma wyróżniającego się trendu na parze walutowej ${props.cryptoSymbol}/PLN.`;
            default:
                return `Brak danych dotyczących analizy technicznej dla pary walutowej ${props.cryptoSymbol}/PLN.`;
        }
    }

    if (loading) {
        return <div>Loading information about technical analysis result for {props.cryptoSymbol}...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <hr />
            <div>
                {interpretAnalysis(technicalAnalysis)}
            </div>
            <br />
        </>
    );
}

export default CheckCryptoTechnicalAnalysis;