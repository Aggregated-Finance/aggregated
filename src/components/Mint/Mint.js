import logo from '../../AgUSD.svg';
import '../../App.css';
import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import { Card } from 'web3uikit';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

import dai from './Images/dai.svg';
import usdc from './Images/usdc.svg';

const CustomButtonDai = styled(Button)(({ theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#EDF283',
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

class Mint extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Stack direction="row" spacing={2}>
            <Card
              onClick={function noRefCheck(){}}
              setIsSelected={function noRefCheck(){}}
              style={{
                backgroundImage: "linear-gradient(90deg, #F2F79E, #EDF283, #E8EC67)",
                color: "#ffffff",
                width: "40vh"
              }}
            >
              <img src={dai} style={{
                padding: '5vh',
                width: '20vh'
              }}/>
              <CustomButtonDai variant="outlined" style={{
                color: "#FFFFF0"
              }}>Mint AgUSD with DAI</CustomButtonDai>
            </Card>
            {/**/}
            <Card
              onClick={function noRefCheck(){}}
              setIsSelected={function noRefCheck(){}}
              style={{
                backgroundImage: "linear-gradient(90deg, #44355B, #3B2E4D, #31263E)",
                color: "#ffffff",
                width: "40vh"
              }}
            >
              <img src={usdc} style={{
                padding: '5vh',
                width: '20vh'
              }}/>
              <CustomButtonUsdc variant="outlined" style={{
                color: "#FFFFF0"
              }}>Mint AgUSD with USDC</CustomButtonUsdc>
            </Card>
          </Stack>
        </header>
      </div>
    );
  };
}

export default Mint;
