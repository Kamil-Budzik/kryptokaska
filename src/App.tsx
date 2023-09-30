import {Link} from "react-router-dom";

import './App.css'

function App() {

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
