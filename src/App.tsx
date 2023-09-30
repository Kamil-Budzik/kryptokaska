import {NavLink as Link} from "react-router-dom";
import {Button} from "@mui/material";

import './App.css'

function App() {

  return (
   <>
    <header>
        <ul>
            <li>
                <Link to={"/summary"}>
                    <Button>Summary</Button>
                </Link>
            </li>
            <li>
                <Link to={"/settings"}><Button>Settings</Button></Link>
            </li>
            <li>
                <Link to={"/manual"}><Button>Manual</Button></Link>
            </li>
            <li>
                <Link to={"/new-report"}><Button>New Report</Button></Link>
            </li>
            <li>
                <Link to={"/pdf-summary"}><Button>pdf-summary</Button></Link>
            </li>
            <li>
                <Link to={"/api-summary"}><Button>Api summary</Button></Link>
            </li>
        </ul>
    </header>
   </>
  )
}

export default App
