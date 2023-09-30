import React from 'react';
import { NavLink as Link } from 'react-router-dom';
// components
import { Button } from '@mui/material';

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Link to="/">
          <Button variant="outlined">Return</Button>
        </Link>
      </nav>
      {children}
    </>
  );
}

export default Wrapper;
