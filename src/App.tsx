import {Link} from "react-router-dom";

import './App.css'
import { useEffect } from "react";


function App() {
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
   <>
    <header>
        <h1>Root page</h1>
        <ul>
            <li>
                <Link to={"/summary"}>Summary</Link>
            </li>
            <li>
                <Link to={"/settings"}>Settings</Link>
            </li>
            <li>
                <Link to={"/manual"}>Manual</Link>
            </li>
            <li>
                <Link to={"/new-report"}>New Report</Link>
            </li>
            <li>
                <Link to={"/pdf-summary"}>pdf-summary</Link>
            </li>
            <li>
                <Link to={"/api-summary"}>Api summary</Link>
            </li>
        </ul>
    </header>
   </>
  )
}

export default App
