import logo1 from '../../AgUSD2.png';
import logo2 from '../../AgUSD.svg';
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
  const Logo = () => {
    const rand = (Math.random() * 2);
    if (rand > 1) {
      return (<img src={logo1} className="App-logo" alt="logo" />);
    } else {
      return(<img src={logo2} className="App-logo" alt="logo" />)
    };
  }

  return (
    <div className="Apph">
      <header className="App-header">
        <Logo />
        <h2>Aggregated USD</h2>
        <p>
          The home of multi-fauceted stability.
        </p>
        <Stack direction="row" spacing={2}>
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
