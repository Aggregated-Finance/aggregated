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
import agabi from '../../AgUSDAbi.js';
import constants from '../../constants.js';
import { truncateAddress } from '../../helpers/truncateAddress.js';


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
    this.state = {
      tvl: 0,
      showModal: {
        dai: false,
        usdc: false,
        fusdt: false,
        frax: false,
        mim: false
      },
      holdings: {
        dai: 0,
        usdc: 0,
        fusdt: 0,
        frax: 0,
        mim: 0
      },
      dai: new Contract("0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",abi,prov),
      usdc: new Contract("0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",abi,prov),
      fusdt: new Contract("0x049d68029688eAbF473097a2fC38ef61633A3C7A",abi,prov),
      frax: new Contract("0xdc301622e621166BD8E82f2cA0A26c13Ad0BE355",abi,prov),
      mim: new Contract("0x82f0B8B456c1A451378467398982d4834b6829c1",abi,prov),
      input: 0
    }

    this.connectWallet = this.connectWallet.bind(this);

    this.setMaxDai = this.setMaxDai.bind(this);
    this.setMaxUsdc = this.setMaxUsdc.bind(this);
    this.setMaxFusdt = this.setMaxFusdt.bind(this);
    this.setMaxFrax = this.setMaxFrax.bind(this);
    this.setMaxMim = this.setMaxMim.bind(this);

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
    //const { chainId } = await provider.getNetwork();
    let signer = provider.getSigner();
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0];

    this.setState({
      account: account,
      signer: signer,
    })

    let dai = new Contract("0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",abi,signer);
    let usdc = new Contract("0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",abi,signer);
    let fusdt = new Contract("0x049d68029688eAbF473097a2fC38ef61633A3C7A",abi,signer);
    let frax = new Contract("0xdc301622e621166BD8E82f2cA0A26c13Ad0BE355",abi,signer);
    let mim = new Contract("0x82f0B8B456c1A451378467398982d4834b6829c1",abi,signer);

    let agUsd = new Contract(constants.agusd,agabi,signer);

    let holdings = {
      dai: 0,
      usdc: 0,
      fusdt: 0,
      frax: 0,
      mim: 0
    }

    await dai.functions.balanceOf(account).then(res => {
      holdings.dai = res[0];
    });

    await usdc.functions.balanceOf(account).then(res => {
      holdings.usdc = res[0];
    });

    await fusdt.functions.balanceOf(account).then(res => {
      holdings.fusdt = res[0];
    });

    await frax.functions.balanceOf(account).then(res => {
      holdings.frax = res[0];
    });

    await mim.functions.balanceOf(account).then(res => {
      holdings.mim = res[0];
    });

    this.setState({
      dai: dai,
      usdc: usdc,
      fusdt: fusdt,
      frax: frax,
      mim: mim,
      holdings: holdings,
      contract: agUsd
    });
  }

  disconnectWallet() {
    this.setState({
      account: null,
      signer: null
    })
  }

  setMaxDai() {
    this.setState({
      input: (this.state.holdings.dai)/10**18,
    });
  }

  setMaxUsdc() {
    this.setState({
      input: (this.state.holdings.usdc)/10**6,
    });
  }

  setMaxFusdt() {
    this.setState({
      input: (this.state.holdings.fusdt)/10**6,
    });
  }

  setMaxFrax() {
    this.setState({
      input: (this.state.holdings.frax)/10**18,
    });
  }

  setMaxMim() {
    this.setState({
      input: (this.state.holdings.mim)/10**18,
    });
  }
 
  render() {
    
    return (
      <div className="navbarheader" style={{
        padding: '14px 27px',
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
        >{this.state.account ?
          <CustomButton
            variant="text"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              backgroundColor: '#e69965'
            }}
            onClick={this.connectWallet}
          >{truncateAddress(this.state.account)}</CustomButton> :
          <CustomButton
            variant="text"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              borderColor: 'black'
            }}
            onClick={this.connectWallet}
          >Connect Wallet</CustomButton>}
        </CustomButton>
        </Stack>
      </div>
    )
  }
}

export default Navbar;
