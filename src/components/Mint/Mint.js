import '../../App.css';
import logo from '../../AgUSD.png';
import constants from '../../constants.js';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Modal, Input } from 'web3uikit';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import arrow from './single-arrow.svg';

import { Type } from '../Text';
import { ButtonMax } from '../Button';
import CurrencyLogo from '../Currency';

import Toastify from 'toastify-js';
import "../../toastify.css";

import { ethers, Contract } from 'ethers';
import abi from './erc20abi.js';
import agabi from '../../AgUSDAbi.js';

import dai from './Images/dai.svg';
import usdc from './Images/usdc.svg';
import fusdt from './Images/fusdt.svg';
import frax from './Images/frax.svg';
import mim from './Images/mim.png';

import { Flex, Box, Image } from 'rebass/styled-components';

import DeleteIcon from '@mui/icons-material/Delete';

import { truncateAddress } from '../../helpers/truncateAddress.js';

import { ButtonSyncDeactivated, ButtonSyncActive } from '../Button';


const ButtonSwap = styled(ButtonSyncActive)`
    background: linear-gradient(135deg, rgb(240, 171, 124), rgb(192, 88, 17), rgb(136, 61, 12));
    color: #FFF;
    font-size: 20px;
    border: 2px solid #DFEFCA;
    font-family: 'Montserrat';
    margin-top: 3px;
    border-radius: 15px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    transition-timing-function: ease-in-out;
    &:hover {
      background: linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124));
    }
`

const Wrapper = styled.div`
    position: relative;
    height: 90px;
    width: 70vh;
    margin-top: ${({ mt }) => (mt && mt)};
    background: rgb(192, 88, 17);
    max-width: 70vh;
    margin-right: 15vh;
    margin-left: 15vh;
    border: 2px solid #DFEFCA;
    padding:0 15px;
    border-radius: ${({ borderRadius }) => borderRadius || "15px"};
`

const InputAmount = styled.input.attrs({
    type: "number",
    autocomplete: "off",
    autocorrect: "off",
    spellcheck: "false"
})`
    font-weight: 400;
    flex: 1 1 auto;
    border: #FFF;
    outline-style: none;
    width: ${({ width }) => width || "0px"};
    font-size: ${({ fontSize }) => fontSize || "25px"};
    color: #FFF;
    background: transparent;
    cursor: ${({ disabled }) => (disabled && "not-allowed")};

    ::placeholder {
      color: #ABBBA3;
    }

    ::-ms-input-placeholder {
      color: #ABBBA3;
    }
`

const TokenInfo = styled(Flex)`
    align-items:center;
    cursor:${({ active }) => active ? "pointer" : "default"};
    &:hover{
        filter:${({ active }) => active && "brightness(0.8)"};
    }
`

const CustomButtonDai = styled(Button)(({  _theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#FFB236',
    textDecoration: 'none',
  }
}));

const CustomButtonUsdc = styled(Button)(({  _theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#3B2E4D',
    textDecoration: 'none',
  }
}));

const CustomButtonFusdt = styled(Button)(({  _theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#3BD787',
    textDecoration: 'none',
  }
}));

const CustomButtonFrax = styled(Button)(({  _theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#321821',
    textDecoration: 'none',
  }
}));

const CustomButtonMim = styled(Button)(({  _theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#F4B565',
    textDecoration: 'none',
  }
}));

const CustomButton = styled(Button)(({  _theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: 'transparent',
    textDecoration: 'none',
  }
}));

const prov = new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools');

var forb = [
  '~',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')', '_', '+', '`', '-', '=', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '/', ';', "'", '[', ']', '\\', '<', '>', '?', ':', '"', '{', '}', '|', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M',
]

function formatInput(thing) {
  for (var i = 0; i < forb.length; i++) {
    thing = thing.replace(forb[i],"");
  }
  return thing;
}

class Mint extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tvl: 0,
      showModal: {
        dai: true,
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
    this.setModalDai = this.setModalDai.bind(this);
    this.setModalUsdc = this.setModalUsdc.bind(this);
    this.setModalFusdt = this.setModalFusdt.bind(this);
    this.setModalFrax = this.setModalFrax.bind(this);
    this.setModalMim = this.setModalMim.bind(this);


    this.approveDai = this.approveDai.bind(this);
    this.mintDai = this.mintDai.bind(this);

    this.approveUsdc = this.approveUsdc.bind(this);
    this.mintUsdc = this.mintUsdc.bind(this);

    this.approveFusdt = this.approveFusdt.bind(this);
    this.mintFusdt = this.mintFusdt.bind(this);

    this.approveFrax = this.approveFrax.bind(this);
    this.mintFrax = this.mintFrax.bind(this);

    this.approveMim = this.approveMim.bind(this);
    this.mintMim = this.mintMim.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.connectWallet = this.connectWallet.bind(this);
    this.disconnectWallet = this.disconnectWallet.bind(this);

    this.setMaxDai = this.setMaxDai.bind(this);
    this.setMaxUsdc = this.setMaxUsdc.bind(this);
    this.setMaxFusdt = this.setMaxFusdt.bind(this);
    this.setMaxFrax = this.setMaxFrax.bind(this);
    this.setMaxMim = this.setMaxMim.bind(this);
  }

  setModalDai() {
    this.setState({
      showModal: {
        dai: true,
        usdc: false,
        fusdt: false,
        frax: false,
        mim: false
      },
      input: 0,
    });
  }

  setModalUsdc() {
    this.setState({
      showModal: {
        dai: false,
        usdc: true,
        fusdt: false,
        frax: false,
        mim: false
      },
      input: 0,
    });
  }

  setModalFusdt() {
    this.setState({
      showModal: {
        dai: false,
        usdc: false,
        fusdt: true,
        frax: false,
        mim: false
      },
      input: 0,
    });
  }

  setModalFrax() {
    this.setState({
      showModal: {
        dai: false,
        usdc: false,
        fusdt: false,
        frax: true,
        mim: false
      },
      input: 0,
    });
  }

  setModalMim() {
    this.setState({
      showModal: {
        dai: false,
        usdc: false,
        fusdt: false,
        frax: false,
        mim: true,
      },
      input: 0,
    });
  }

  handleChange(event) {
    this.setState({ input: parseFloat(formatInput(event.target.value)) });
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

    Toastify({
      text: `Connecting wallet: ${truncateAddress(account)}`,
      duration: 7000,
      close: true,
      gravity: 'top',
      style: {
        background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
      },
    }).showToast();

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

    let tvl;

    await agUsd.functions.totalSupply().then(res => {
      tvl = (parseInt(res[0]._hex, 16)/10**18).toFixed(2);
    });

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
      contract: agUsd,
      tvl: tvl
    });
  }


  async approveDai() {
    this.state.dai.functions.approve(constants.agusd,"115792089237316195423570985008687907853269984665640564039457584007913129639935").catch(e => {
      if (e.data.message) {
        Toastify({
          text: `Unknown error: ${e.data.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      } else {
        Toastify({
          text: `Unknown error: ${e.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      }
    });
  }

  async mintDai() {
    this.state.contract.functions.mintFromDAI(ethers.utils.parseEther((this.state.input).toString())).catch(e => {
      if (e.data.message) {
        Toastify({
          text: `Unknown error: ${e.data.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      } else {
        Toastify({
          text: `Unknown error: ${e.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      }
    });
  }

  async approveUsdc() {
    this.state.usdc.functions.approve(constants.agusd,"115792089237316195423570985008687907853269984665640564039457584007913129639935").catch(e => {
      if (e.data.message) {
        Toastify({
          text: `Unknown error: ${e.data.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      } else {
        Toastify({
          text: `Unknown error: ${e.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      }
    });
  }

  async mintUsdc() {
    this.state.contract.functions.mintFromUSDC(ethers.utils.parseEther((this.state.input).toString())).catch(e => {
      if (e.data.message) {
        Toastify({
          text: `Unknown error: ${e.data.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      } else {
        Toastify({
          text: `Unknown error: ${e.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      }
    });
  }

  async approveFusdt() {
    this.state.fusdt.functions.approve(constants.agusd,"115792089237316195423570985008687907853269984665640564039457584007913129639935").catch(e => {
      if (e.data.message) {
        Toastify({
          text: `Unknown error: ${e.data.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      } else {
        Toastify({
          text: `Unknown error: ${e.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      }
    });
  }

  async mintFusdt() {
    this.state.contract.functions.mintFromFUSDT(ethers.utils.parseEther((this.state.input).toString())).catch(e => {
      if (e.data.message) {
        Toastify({
          text: `Unknown error: ${e.data.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      } else {
        Toastify({
          text: `Unknown error: ${e.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      }
    });
  }

  async approveFrax() {
    this.state.frax.functions.approve(constants.agusd,"115792089237316195423570985008687907853269984665640564039457584007913129639935").catch(e => {
      if (e.data.message) {
        Toastify({
          text: `Unknown error: ${e.data.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      } else {
        Toastify({
          text: `Unknown error: ${e.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      }
    });
  }

  async mintFrax() {
    this.state.contract.functions.mintFromFRAX(ethers.utils.parseEther((this.state.input).toString())).catch(e => {
      if (e.data.message) {
        Toastify({
          text: `Unknown error: ${e.data.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      } else {
        Toastify({
          text: `Unknown error: ${e.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      }
    });
  }

  async approveMim() {
    this.state.mim.functions.approve(constants.agusd,"115792089237316195423570985008687907853269984665640564039457584007913129639935").catch(e => {
      if (e.data.message) {
        Toastify({
          text: `Unknown error: ${e.data.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      } else {
        Toastify({
          text: `Unknown error: ${e.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      }
    });
  }

  async mintMim() {
    this.state.contract.functions.mintFromMIM(ethers.utils.parseEther((this.state.input).toString())).catch(e => {
      if (e.data.message) {
        Toastify({
          text: `Unknown error: ${e.data.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      } else {
        Toastify({
          text: `Unknown error: ${e.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          style: {
            background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
          },
        }).showToast();
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="gluon" style={{
          padding: '0vh'
        }}>
          {/*
            <CustomButton
              variant="outlined"
              style={{
                textDecoration: 'none',
                color: '#ffffff',
                marginTop: '7.5vh'
              }}
              onClick={this.connectWallet}
            >{this.state.account  || "Connect Wallet"}</CustomButton>
            <h1>The Gluon Minter</h1>
            <h2>AgUSD Total Value Locked: ${this.state.tvl}</h2>
            */}
          <h1>The Gluon Minter</h1>
          {/*<CustomButton
            variant='contained'
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              backgroundColor: '#e69965',
              borderColor: 'black',
              size: 'small',
              borderRadius: '30px'
            }}
          >{this.state.account ?
            <CustomButton
              variant="text"
              style={{
                textDecoration: 'none',
                color: '#ffffff',
                backgroundColor: '#e69965'
              }}
              onClick={this.disconnectWallet}
            >{truncateAddress(this.state.account)} <DeleteIcon /></CustomButton> :
            <CustomButton
              variant="text"
              style={{
                textDecoration: 'none',
                color: '#ffffff',
                borderColor: 'black',
                borderRadius: '30px'
              }}
              onClick={this.connectWallet}
            >Connect Wallet</CustomButton>}
          </CustomButton>*/}
          <Stack direction="row" margin={1}
           style={{opacity: '0.90'}} >
            <h5 >MINT WITH</h5>
            <CustomButtonDai style={{ borderRadius: '30px' }} variant="outline" onClick={this.setModalDai}><img src={dai} height="33" width="33"></img></CustomButtonDai>
            <CustomButtonUsdc style={{ borderRadius: '30px' }} variant="outline" onClick={this.setModalUsdc}><img src={usdc} height="33" width="33"></img></CustomButtonUsdc>
            <CustomButtonFusdt style={{ borderRadius: '30px' }} variant="outline" onClick={this.setModalFusdt}><img src={fusdt} height="33" width="33"></img></CustomButtonFusdt>
            <CustomButtonFrax style={{ borderRadius: '30px' }} variant="outline" onClick={this.setModalFrax}><img src={frax} height="33" width="33"></img></CustomButtonFrax>
            <CustomButtonMim style={{ borderRadius: '30px' }} variant="outline" onClick={this.setModalMim}><img src={mim} height="33" width="33"></img></CustomButtonMim>
          </Stack>
          {this.state.showModal.dai ? (<>
          <Wrapper>
            <Flex p="10px 0" justifyContent={"space-between"}>
              <Box>
                <Type.SM color={"secondary"}>
                  Input
                </Type.SM>

                <Flex justifyContent="space-between" alignItems="center" mt="5px" marginRight="4vw">
                  <InputAmount placeholder={((this.state.holdings.dai)/10**18) || "0.0"} min="0" value={this.state.input || ""} width="40vw" onChange={this.handleChange} />
                  <ButtonMax width={"4vw"} onClick={this.setMaxDai}>
                    MAX
                  </ButtonMax>
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={dai}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">DAI</Type.LG>
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          <Link to="/withdraw"><Link to="/withdraw"><Image src={arrow} size="20px" my="15px"/></Link></Link>
          <Wrapper>
            <Flex p="10px 0" justifyContent={"space-between"}>
              <Box>
                <Type.SM color={"secondary"}>
                 Output
                 </Type.SM>

                 <Flex justifyContent="space-between" alignItems="center" mt="5px" marginRight="4vw">
                  <InputAmount placeholder="0.0" min="0" value={(this.state.input) || ""} width="40vw" onChange={this.handleChange} />
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={logo}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">AgUSD</Type.LG>
                    {/*<Image src={dai} size="10px" />*/}
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          {this.state.account ?
            (<><ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.approveDai}
            >Approve DAI</ButtonSwap><ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.mintDai}
            >Mint</ButtonSwap></>) :
            (<ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.connectWallet}
            >Connect Wallet</ButtonSwap>)}</>) : <div/>}
          {/**/}
          {this.state.showModal.usdc ? (<>
          <Wrapper>
            <Flex p="10px 0" justifyContent={"space-between"}>
              <Box>
                <Type.SM color={"secondary"}>
                  Input
                </Type.SM>

                <Flex justifyContent="space-between" alignItems="center" mt="5px" marginRight="4vw">
                  <InputAmount placeholder={((this.state.holdings.usdc)/10**18) || "0.0"} min="0" value={this.state.input || ""} width="40vw" onChange={this.handleChange} />
                  <ButtonMax width={"4vw"} onClick={this.setMaxUsdc}>
                    MAX
                  </ButtonMax>
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={usdc}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">USDC</Type.LG>
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          <Link to="/withdraw"><Image src={arrow} size="20px" my="15px"/></Link>
          <Wrapper>
            <Flex p="10px 0" justifyContent={"space-between"}>
              <Box>
                <Type.SM color={"secondary"}>
                 Output
                 </Type.SM>

                 <Flex justifyContent="space-between" alignItems="center" mt="5px" marginRight="4vw">
                  <InputAmount placeholder="0.0" min="0" value={(this.state.input) || ""} width="40vw" onChange={this.handleChange} />
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={logo}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">AgUSD</Type.LG>
                    {/*<Image src={dai} size="10px" />*/}
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          {this.state.account ?
            (<><ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.approveUsdc}
            >Approve USDC</ButtonSwap><ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.mintUsdc}
            >Mint</ButtonSwap></>) :
            (<ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.connectWallet}
            >Connect Wallet</ButtonSwap>)}</>) : <div/>}
          {/**/}
          {this.state.showModal.fusdt ? (<>
          <Wrapper>
            <Flex p="10px 0" justifyContent={"space-between"}>
              <Box>
                <Type.SM color={"secondary"}>
                  Input
                </Type.SM>

                <Flex justifyContent="space-between" alignItems="center" mt="5px" marginRight="4vw">
                  <InputAmount placeholder={((this.state.holdings.fusdt)/10**18) || "0.0"} min="0" value={this.state.input || ""} width="40vw" onChange={this.handleChange} />
                  <ButtonMax width={"4vw"} onClick={this.setMaxFusdt}>
                    MAX
                  </ButtonMax>
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={fusdt}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">fUSDT</Type.LG>
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          <Link to="/withdraw"><Image src={arrow} size="20px" my="15px"/></Link>
          <Wrapper>
            <Flex p="10px 0" justifyContent={"space-between"}>
              <Box>
                <Type.SM color={"secondary"}>
                 Output
                 </Type.SM>

                 <Flex justifyContent="space-between" alignItems="center" mt="5px" marginRight="4vw">
                  <InputAmount placeholder="0.0" min="0" value={(this.state.input) || ""} width="40vw" onChange={this.handleChange} />
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={logo}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">AgUSD</Type.LG>
                    {/*<Image src={dai} size="10px" />*/}
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          {this.state.account ?
            (<><ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.approveFusdt}
            >Approve fUSDT</ButtonSwap><ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.mintFusdt}
            >Mint</ButtonSwap></>) :
            (<ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.connectWallet}
            >Connect Wallet</ButtonSwap>)}</>) : <div/>}
          {/**/}
          {this.state.showModal.frax ? (<>
          <Wrapper>
            <Flex p="10px 0" justifyContent={"space-between"}>
              <Box>
                <Type.SM color={"secondary"}>
                  Input
                </Type.SM>

                <Flex justifyContent="space-between" alignItems="center" mt="5px" marginRight="4vw">
                  <InputAmount placeholder={((this.state.holdings.frax)/10**18) || "0.0"} min="0" value={this.state.input || ""} width="40vw" onChange={this.handleChange} />
                  <ButtonMax width={"4vw"} onClick={this.setMaxFrax}>
                    MAX
                  </ButtonMax>
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={frax}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">FRAX</Type.LG>
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          <Link to="/withdraw"><Image src={arrow} size="20px" my="15px"/></Link>
          <Wrapper>
            <Flex p="10px 0" justifyContent={"space-between"}>
              <Box>
                <Type.SM color={"secondary"}>
                 Output
                 </Type.SM>

                 <Flex justifyContent="space-between" alignItems="center" mt="5px" marginRight="4vw">
                  <InputAmount placeholder="0.0" min="0" value={(this.state.input) || ""} width="40vw" onChange={this.handleChange} />
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={logo}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">AgUSD</Type.LG>
                    {/*<Image src={dai} size="10px" />*/}
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          {this.state.account ?
            (<><ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.approveFrax}
            >Approve FRAX</ButtonSwap><ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.mintFrax}
            >Mint</ButtonSwap></>) :
            (<ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.connectWallet}
            >Connect Wallet</ButtonSwap>)}</>) : <div/>}
          {/**/}
          {this.state.showModal.mim ? (<>
          <Wrapper>
            <Flex p="10px 0" justifyContent={"space-between"}>
              <Box>
                <Type.SM color={"secondary"}>
                  Input
                </Type.SM>

                <Flex justifyContent="space-between" alignItems="center" mt="5px" marginRight="4vw">
                  <InputAmount placeholder={((this.state.holdings.mim)/10**18) || "0.0"} min="0" value={this.state.input || ""} width="40vw" onChange={this.handleChange} />
                  <ButtonMax width={"4vw"} onClick={this.setMaxMim}>
                    MAX
                  </ButtonMax>
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={mim}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">MIM</Type.LG>
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          <Link to="/withdraw"><Image src={arrow} size="20px" my="15px"/></Link>
          <Wrapper>
            <Flex p="10px 0" justifyContent={"space-between"}>
              <Box>
                <Type.SM color={"secondary"}>
                 Output
                 </Type.SM>

                 <Flex justifyContent="space-between" alignItems="center" mt="5px" marginRight="4vw">
                  <InputAmount placeholder="0.0" min="0" value={(this.state.input) || ""} width="40vw" onChange={this.handleChange} />
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={logo}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">AgUSD</Type.LG>
                    {/*<Image src={dai} size="10px" />*/}
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          {this.state.account ? (<><ButtonSwap style={{
            width: '75vh',
          }}
            onClick={this.approveMim}
          >Approve MIM</ButtonSwap><ButtonSwap style={{
            width: '75vh',
          }}
            onClick={this.mintMim}
          >Mint</ButtonSwap></>) :
            (<ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.connectWallet}
            >Connect Wallet</ButtonSwap>)}</>) : <div/>}
          {this.state.tvl > 0 && <h2>AgUSD Total Value Locked: {`$${(this.state.tvl).toString()}`}</h2>}
          <br /><br />
        </header>
      </div>
    );
  };
}

export default Mint;
