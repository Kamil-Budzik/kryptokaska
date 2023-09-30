import { NavLink as Link } from 'react-router-dom';
// components
import { Button } from '@mui/material';
import Wrapper from './components/UI/Wrapper';
// styles
import './App.css';

function App() {
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
