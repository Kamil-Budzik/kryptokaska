import { NavLink as Link } from 'react-router-dom';
import { useEffect } from "react";

// components
import { Button } from '@mui/material';
import Wrapper from './components/UI/Wrapper';
// styles
import './App.css';
import {CoinGecko} from "./integrations/apis/coingecko.ts";
import {AxiosUtil} from "./integrations/axios/Axios.ts";

function App() {
    (() => {
        const coingecko = new CoinGecko(new AxiosUtil())
        coingecko.getHistoricalData("bitcoin", 1)
    })();


    useEffect(() => {
        window.ipcRenderer.send("load-settings")     
        window.ipcRenderer.on("settings-loaded", (_event, arg) => {
            console.log(arg)
        })
        window.ipcRenderer.send("add-new-crypto", {
            id: "new-crypto",
            fullName: "new-crypto",
            shortName: "new",
        });

      }, []);
  return (
    <Wrapper>
      <main>
        <nav>
          <ul>

            <li>
              <Link to="/settings">
                <Button>Settings</Button>
              </Link>
            </li>
            <li>
              <Link to="/new-report">
                <Button>New report</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </Wrapper>
  );
}

export default App;
