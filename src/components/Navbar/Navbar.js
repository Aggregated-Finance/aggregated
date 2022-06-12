import React, { Component } from 'react';
import '../../App.css';
import './Nav.css';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import logo from '../../AgUSD.png';
import { ethers, Contract } from 'ethers';
import abi from './erc20abi.js';


const CustomButton = styled(Button)(({ _theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    //borderColor: '#ffffff',
    //backgroundColor: '#f0ab7c',
    textDecoration: 'none',
  }
}));

const prov = new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools');

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = { /**/ }
  }

  render() {

    return (
      <div className="navbarheader" style={{
        padding: '14px 14px',
        display: 'static'
      }}>
        <Stack direction="row" spacing={23} style={{
              fontWeight: "bold",
              textDecoration: 'none',
              color: '#ffffff'
        }}>
          <Link to="/"><img src={logo} height="50" width="50" style={{
          }} alt="AgUSD" /></Link>
          <CustomButton variant="text">
            <Link to="/" style={{
              fontWeight: "bold",
              textDecoration: 'none',
              color: '#ffffff'
            }}>Home</Link>
          </CustomButton>
          <CustomButton variant="text">
            <Link to="/mint" style={{
              fontWeight: "bold",
              textDecoration: 'none',
              color: '#ffffff'
            }}>Mint</Link>
          </CustomButton>
          <CustomButton variant="text">
            <Link to="/withdraw" style={{
              fontWeight: "bold",
              textDecoration: 'none',
              color: '#ffffff'
            }}>Withdraw</Link>
          </CustomButton>
          <CustomButton variant="text">
            <Link to="/info" style={{
              fontWeight: "bold",
              textDecoration: 'none',
              color: '#ffffff'
            }}>About</Link>
          </CustomButton>
        </Stack>
      </div>
    )
  }
}

export default Navbar;
