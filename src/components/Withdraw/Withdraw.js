import '../../App.css';
import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import { Card } from 'web3uikit';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

import dai from './Images/dai.svg';
import usdc from './Images/usdc.svg';
import fusdt from './Images/fusdt.svg';
import frax from './Images/frax.svg';
import mim from './Images/mim.png';

const CustomButtonDai = styled(Button)(({ theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#FFB236',
    textDecoration: 'none',
  }
}));

const CustomButtonUsdc = styled(Button)(({ theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#3B2E4D',
    textDecoration: 'none',
  }
}));

const CustomButtonFusdt = styled(Button)(({ theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#3BD787',
    textDecoration: 'none',
  }
}));

const CustomButtonFrax = styled(Button)(({ theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#321821',
    textDecoration: 'none',
  }
}));

const CustomButtonMim = styled(Button)(({ theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#F4B565',
    textDecoration: 'none',
  }
}));

class Withdraw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      holdings: 0
    }
  }

  render() {
    return (
      <div className="App">
        <header className="gluon" style={{
          paddingTop: '0vh'
        }}>
          <h1>The Boson Burner</h1>
          <h2>AgUSD in your wallet: {this.state.holdings}</h2>
          <Stack direction="row" spacing={2}>
            <Card
              onClick={function noRefCheck(){}}
              setIsSelected={function noRefCheck(){}}
              style={{
                backgroundImage: "linear-gradient(90deg, #FFD23F, #FFB236, #FF922D)",
                color: "#ffffff",
                width: "36vh"
              }}
            >
              <img alt="token" src={dai} style={{
                padding: '5vh',
                width: '20vh'
              }}/>
              <CustomButtonDai variant="outlined" style={{
                color: "#FFFFF0"
              }}>Burn AgUSD for DAI</CustomButtonDai>
            </Card>
            {/**/}
            <Card
              onClick={function noRefCheck(){}}
              setIsSelected={function noRefCheck(){}}
              style={{
                backgroundImage: "linear-gradient(90deg, #44355B, #3B2E4D, #31263E)",
                color: "#ffffff",
                width: "36vh"
              }}
            >
              <img alt="token" src={usdc} style={{
                padding: '5vh',
                width: '20vh'
              }}/>
              <CustomButtonUsdc variant="outlined" style={{
                color: "#FFFFF0"
              }}>Burn AgUSD for USDC</CustomButtonUsdc>
            </Card>
            {/**/}
            <Card
              onClick={function noRefCheck(){}}
              setIsSelected={function noRefCheck(){}}
              style={{
                backgroundImage: "linear-gradient(90deg, #40F99B, #3BD787, #39C67D)",
                color: "#ffffff",
                width: "36vh"
              }}
            >
              <img alt="token" src={fusdt} style={{
                padding: '5vh',
                width: '20vh',
                height: '20vh'
              }}/>
              <CustomButtonFusdt variant="outlined" style={{
                color: "#FFFFF0"
              }}>Burn AgUSD for FUSDT</CustomButtonFusdt>
            </Card>
            {/**/}
            <Card
              onClick={function noRefCheck(){}}
              setIsSelected={function noRefCheck(){}}
              style={{
                backgroundImage: "linear-gradient(90deg, #2D1B24, #321821, #36151E)",
                color: "#ffffff",
                width: "36vh"
              }}
            >
              <img alt="token" src={frax} style={{
                padding: '5vh',
                width: '20vh'
              }}/>
              <CustomButtonFrax variant="outlined" style={{
                color: "#FFFFF0"
              }}>Burn AgUSD for FRAX</CustomButtonFrax>
            </Card>
            {/**/}
            <Card
              onClick={function noRefCheck(){}}
              setIsSelected={function noRefCheck(){}}
              style={{
                backgroundImage: "linear-gradient(90deg, #F7B05B, #F4B565, #F1BA6E)",
                color: "#ffffff",
                width: "36vh"
              }}
            >
              <img alt="token" src={mim} style={{
                padding: '5vh',
                width: '20vh'
              }}/>
              <CustomButtonMim variant="outlined" style={{
                color: "#FFFFF0"
              }}>Burn AgUSD for MIM</CustomButtonMim>
            </Card>
          </Stack>
        </header>
      </div>
    );
  };
}

export default Withdraw;
