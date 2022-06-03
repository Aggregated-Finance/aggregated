import React, { Component } from 'react';
import '../../App.css';
import "./Nav.css";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import logo from '../../AgUSD.png';
import { ethers } from 'ethers';


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

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: null,
      signer: null
    }
    this.connectWallet = this.connectWallet.bind(this);
  }

  async connectWallet() {
    
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
        chainId: "0xFA",
        rpcUrls: ["https://rpc.ftm.tools"],
        chainName: "Fantom Opera",
        nativeCurrency: {
          name: "FTM",
          symbol: "FTM",
          decimals: 18
        },
        blockExplorerUrls: ["https://ftmscan.com/"]
      }]
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum, 250);
    let signer = provider.getSigner();
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0];
    
    this.setState({
      account: account,
      signer: signer
    });

  }

  disconnectWallet() {
    this.setState({
      account: null,
      signer: null
    });
  }
  
 
  render() {
    var addr = this.state.account;
    
    return (
      <div className="navbarheader" style={{
        paddingTop: '17px', 
        display: 'static'
      }}>
        <Stack direction="row" spacing={23} style={{
          paddingRight: '15em',
          paddingTop: '0.4vh'
        }}>
          <Link to="/"><img src={logo} height="50" width="50" style={{
            marginRight: "5vw"
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
          <CustomButton
          variant='contained'
          style={{
            textDecoration: 'none',
            color: '#ffffff',
            backgroundColor: '#e69965',
            borderColor: 'black',
            size: 'small'
          }}
          onClick={this.connectWallet}
        >{ addr || "Connect Wallet"}
        </CustomButton>
        </Stack>
      </div>
    )
  }
}

export default Navbar;
