import React from 'react';
import { useNavigate } from 'react-router-dom';


// components
import { Button } from '@mui/material';
import { Container } from '@mui/system';

function Wrapper({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Container>
      <nav>
          <Button onClick={handleGoBack} sx={{ displayPrint: "none" }} variant="outlined">Return</Button>
      </nav>
      {children}
    </Container>
  );
}

export default Wrapper;
