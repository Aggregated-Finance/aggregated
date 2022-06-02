import logo from '../../AgUSD.svg';
import '../../App.css';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

const CustomButton = styled(Button)(({ theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#f0ab7c',
    textDecoration: 'none',
  }
}));

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Aggregated USD</h2>
        <p>
          The home of multi-fauceted stability.
        </p>
        <Stack direction="column" spacing={2}>
          <CustomButton variant="outlined" style={{
            color: "#ffffff"
          }}>
            <Link
              to="mint"
              style={{
                textDecoration: 'none',
                color: '#ffffff'
              }}>
              Go to the Gluon Minter
            </Link>
          </CustomButton>
          <CustomButton variant="outlined" style={{
            color: "#ffffff"
          }}>
            <Link
              to="info"
              style={{
                textDecoration: 'none',
                color: '#ffffff'
              }}>
              About AgUSD
            </Link>
          </CustomButton>
        </Stack>
      </header>
    </div>
  );
}

export default Home;
