import { NavLink as Link } from 'react-router-dom';

// components
import { Button, Card, CardMedia } from '@mui/material';
import Wrapper from './components/UI/Wrapper';
// styles
import './App.css';
import { fontSize } from '@mui/system';

function App() {
  return (
    <Wrapper hideReturn={true}>
      <main>
        <nav>
          <ul>
            <li>

                <CardMedia
                  component="img"
                  sx={{ width: "60%", margin: "auto",  borderRadius: 5 }}
                  image="/kryptokaska.jpg"
                  alt="Image Title"
                />
              
              {/* <img src={"/kryptokaska.jpg"} className="App-logo" alt="logo" /> */}
            </li>
            <li>
              <Link to="/settings">
                <Button variant="contained" sx={{fontSize: 40, borderRadius: 5, mb: 3, mt: 5}} style={{ backgroundColor: 'blue', color: 'white' }}>Settings</Button>
              </Link>
            </li>
            <li>
              <Link to="/new-report">
                <Button variant="contained" sx={{fontSize: 40, borderRadius: 5 }} style={{ backgroundColor: 'green', color: 'white' }}>New report</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </Wrapper>
  );
}

export default App;
