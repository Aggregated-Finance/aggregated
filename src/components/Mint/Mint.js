import '../../App.css';
import constants from '../../constants.js';
import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import { Card, Modal, Input } from 'web3uikit';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
    backgroundColor: '#f0ab7c',
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
    this.setModalDai = this.setModalDai.bind(this);
    this.setModalUsdc = this.setModalUsdc.bind(this);
    this.setModalFusdt = this.setModalFusdt.bind(this);
    this.setModalFrax = this.setModalFrax.bind(this);
    this.setModalMim = this.setModalMim.bind(this);

    this.connectWallet = this.connectWallet.bind(this);

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

    this.setMaxDai = this.setMaxDai.bind(this);
    this.setMaxUsdc = this.setMaxUsdc.bind(this);
    this.setMaxFusdt = this.setMaxFusdt.bind(this);
    this.setMaxFrax = this.setMaxFrax.bind(this);
    this.setMaxMim = this.setMaxMim.bind(this);

  }

  setModalDai() {
    this.setState({
      showModal: {
        dai: !(this.state.showModal.dai),
        usdc: false,
        fusdt: false,
        frax: false,
        mim: false
      }
    });
  }

  setModalUsdc() {
    this.setState({
      showModal: {
        dai: false,
        usdc: !(this.state.showModal.usdc),
        fusdt: false,
        frax: false,
        mim: false
      }
    });
  }

  setModalFusdt() {
    this.setState({
      showModal: {
        dai: false,
        usdc: false,
        fusdt: !(this.state.showModal.fusdt),
        frax: false,
        mim: false
      }
    });
  }

  setModalFrax() {
    this.setState({
      showModal: {
        dai: false,
        usdc: false,
        fusdt: false,
        frax: !(this.state.showModal.frax),
        mim: false
      }
    });
  }

  setModalMim() {
    this.setState({
      showModal: {
        dai: false,
        usdc: false,
        fusdt: false,
        frax: false,
        mim: !(this.state.showModal.mim),
      }
    });
  }

  handleChange(event) {
    this.setState({ input: parseFloat(formatInput(event.target.value)) });
  }

  async approveDai() {
    this.state.dai.functions.approve(constants.agusd,"115792089237316195423570985008687907853269984665640564039457584007913129639935").catch(e => {

      Toastify({
        text: `Unknown error: ${e.message}`,
        duration: 2000,
        close: true,
        gravity: 'top',
        style: {
          background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
        },
      }).showToast();
    });
  }

  async mintDai() {
    this.state.contract.functions.mintFromDAI(ethers.utils.parseEther((this.state.input).toString())).catch(e => {

      Toastify({
        text: `Unknown error: ${e.message}`,
        duration: 2000,
        close: true,
        gravity: 'top',
        style: {
          background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
        },
      }).showToast();
    });
  }

  async approveUsdc() {
    this.state.usdc.functions.approve(constants.agusd,"115792089237316195423570985008687907853269984665640564039457584007913129639935").catch(e => {

      Toastify({
        text: `Unknown error: ${e.message}`,
        duration: 2000,
        close: true,
        gravity: 'top',
        style: {
          background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
        },
      }).showToast();
    });
  }

  async mintUsdc() {
    this.state.contract.functions.mintFromUSDC(ethers.utils.parseEther((this.state.input).toString())).catch(e => {

      Toastify({
        text: `Unknown error: ${e.message}`,
        duration: 2000,
        close: true,
        gravity: 'top',
        style: {
          background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
        },
      }).showToast();
    });
  }

  async approveFusdt() {
    this.state.fusdt.functions.approve(constants.agusd,"115792089237316195423570985008687907853269984665640564039457584007913129639935").catch(e => {

      Toastify({
        text: `Unknown error: ${e.message}`,
        duration: 2000,
        close: true,
        gravity: 'top',
        style: {
          background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
        },
      }).showToast();
    });
  }

  async mintFusdt() {
    this.state.contract.functions.mintFromFUSDT(ethers.utils.parseEther((this.state.input).toString())).catch(e => {

      Toastify({
        text: `Unknown error: ${e.message}`,
        duration: 2000,
        close: true,
        gravity: 'top',
        style: {
          background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
        },
      }).showToast();
    });
  }

  async approveFrax() {
    this.state.frax.functions.approve(constants.agusd,"115792089237316195423570985008687907853269984665640564039457584007913129639935").catch(e => {

      Toastify({
        text: `Unknown error: ${e.message}`,
        duration: 2000,
        close: true,
        gravity: 'top',
        style: {
          background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
        },
      }).showToast();
    });
  }

  async mintFrax() {
    this.state.contract.functions.mintFromFRAX(ethers.utils.parseEther((this.state.input).toString())).catch(e => {

      Toastify({
        text: `Unknown error: ${e.message}`,
        duration: 2000,
        close: true,
        gravity: 'top',
        style: {
          background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
        },
      }).showToast();
    });
  }

  async approveMim() {
    this.state.mim.functions.approve(constants.agusd,"115792089237316195423570985008687907853269984665640564039457584007913129639935").catch(e => {

      Toastify({
        text: `Unknown error: ${e.message}`,
        duration: 2000,
        close: true,
        gravity: 'top',
        style: {
          background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
        },
      }).showToast();
    });
  }

  async mintMim() {
    this.state.contract.functions.mintFromMIM(ethers.utils.parseEther((this.state.input).toString())).catch(e => {

      Toastify({
        text: `Unknown error: ${e.message}`,
        duration: 2000,
        close: true,
        gravity: 'top',
        style: {
          background: "linear-gradient(135deg, rgb(136, 61, 12), rgb(192, 88, 17), rgb(240, 171, 124))",
        },
      }).showToast();
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
            >{this.state.account || "Connect Wallet"}</CustomButton>
            <h1>The Gluon Minter</h1>
            <h2>AgUSD Total Value Locked: ${this.state.tvl}</h2>
            */}
          <h1>The Gluon Minter</h1>
          <CustomButton
            variant="outlined"
            style={{
              textDecoration: 'none',
              color: '#ffffff'
            }}
            onClick={this.connectWallet}
          >{this.state.account || "Connect Wallet"}</CustomButton>

          <h2>AgUSD Total Value Locked: ${this.state.tvl}</h2>
          <Modal
            cancelText="Approve"
            id="regular"
            width="50vw"
            height="30vh"
            okText="Mint AgUSD!"
            isVisible={this.state.showModal.dai}
            onCancel={this.approveDai}
            onCloseButtonPressed={this.setModalDai}
            onOk={this.mintDai}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Mint AgUSD With DAI</h3>}
            style={{
              backgroundImage: 'alinear-gradient(135deg, rgb(240, 171, 124), rgb(192, 88, 17), rgb(136, 61, 12))',
            }}
          >
            <Stack direction="row" margin={2}>
            <Input
              alabel="Amount"
              width="90%"
              style={{
                fontFamily: 'Montserrat'
              }}
              onChange={this.handleChange}
              type="number"
              placeholder={`DAI Balance: ${(this.state.holdings.dai)/10**18}`}
              value={(this.state.input || "")}
            />
            <CustomButton
              onClick={this.setMaxDai}
              style={{
                alignSelf: 'right',
                width: '9%',
                color: '#00000f',
                backgroundColor: 'transparent',
                marginLeft: '1%'
              }}
            >Max</CustomButton>
            </Stack>
            <br />
          </Modal>
          <Modal
            cancelText="Approve"
            id="regular"
            width="50vw"
            height="30vh"
            okText="Mint AgUSD!"
            isVisible={this.state.showModal.usdc}
            onCancel={this.approveUsdc}
            onCloseButtonPressed={this.setModalUsdc}
            onOk={this.mintUsdc}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Mint AgUSD With USDC</h3>}
            style={{
              backgroundImage: 'alinear-gradient(135deg, rgb(240, 171, 124), rgb(192, 88, 17), rgb(136, 61, 12))',
            }}
          >
          <Stack direction="row" margin={2}>
          <Input
            alabel="Amount"
            width="90%"
            style={{
              fontFamily: 'Montserrat'
            }}
            onChange={this.handleChange}
            type="number"
            placeholder={`USDC Balance: ${(this.state.holdings.usdc)/10**6}`}
            value={(this.state.input || "")}
          />
          <CustomButton
            onClick={this.setMaxUsdc}
            style={{
              alignSelf: 'right',
              width: '9%',
              color: '#00000f',
              backgroundColor: 'transparent',
              marginLeft: '1%'
            }}
          >Max</CustomButton>
          </Stack>
            <br />
          </Modal>
          <Modal
            cancelText="Approve"
            id="regular"
            width="50vw"
            height="30vh"
            okText="Mint AgUSD!"
            isVisible={this.state.showModal.fusdt}
            onCancel={this.approveFusdt}
            onCloseButtonPressed={this.setModalFusdt}
            onOk={this.mintFusdt}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Mint AgUSD With fUSDT</h3>}
            style={{
              backgroundImage: 'alinear-gradient(135deg, rgb(240, 171, 124), rgb(192, 88, 17), rgb(136, 61, 12))',
            }}
          >
            <Stack direction="row" margin={2}>
            <Input
            alabel="Amount"
            width="90%"
            style={{
              fontFamily: 'Montserrat'
            }}
            onChange={this.handleChange}
            type="number"
            placeholder={`fUSDT Balance: ${(this.state.holdings.fusdt)/10**6}`}
            value={(this.state.input || "")}
          />
          <CustomButton
            onClick={this.setMaxFusdt}
            style={{
              alignSelf: 'right',
              width: '9%',
              color: '#00000f',
              backgroundColor: 'transparent',
              marginLeft: '1%'
            }}
          >Max</CustomButton>
          </Stack>
            <br />
          </Modal>
          <Modal
            cancelText="Approve"
            id="regular"
            width="50vw"
            height="30vh"
            okText="Mint AgUSD!"
            isVisible={this.state.showModal.frax}
            onCancel={this.approveFrax}
            onCloseButtonPressed={this.setModalFrax}
            onOk={this.mintFrax}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Mint AgUSD With FRAX</h3>}
            style={{
              backgroundImage: 'alinear-gradient(135deg, rgb(240, 171, 124), rgb(192, 88, 17), rgb(136, 61, 12))',
            }}
          >
          <Stack direction="row" margin={2}>
          <Input
            alabel="Amount"
            width="90%"
            style={{
              fontFamily: 'Montserrat'
            }}
            onChange={this.handleChange}
            type="number"
            placeholder={`FRAX Balance: ${(this.state.holdings.frax)/10**18}`}
            value={(this.state.input || "")}
          />
          <CustomButton
            onClick={this.setMaxFrax}
            style={{
              alignSelf: 'right',
              width: '9%',
              color: '#00000f',
              backgroundColor: 'transparent',
              marginLeft: '1%'
            }}
          >Max</CustomButton>
          </Stack>
            <br />
          </Modal>
          <Modal
            cancelText="Approve"
            id="regular"
            width="50vw"
            height="30vh"
            okText="Mint AgUSD!"
            isVisible={this.state.showModal.mim}
            onCancel={this.approveMim}
            onCloseButtonPressed={this.setModalMim}
            onOk={this.mintMim}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Mint AgUSD With MIM</h3>}
            style={{
              backgroundImage: 'alinear-gradient(135deg, rgb(240, 171, 124), rgb(192, 88, 17), rgb(136, 61, 12))',
            }}
          >
          <Stack direction="row" margin={2}>
          <Input
            alabel="Amount"
            width="90%"
            style={{
              fontFamily: 'Montserrat'
            }}
            onChange={this.handleChange}
            type="number"
            placeholder={`MIM Balance: ${(this.state.holdings.mim)/10**18}`}
            value={(this.state.input || "")}
          />
          <CustomButton
            onClick={this.setMaxMim}
            style={{
              alignSelf: 'right',
              width: '9%',
              color: '#00000f',
              backgroundColor: 'transparent',
              marginLeft: '1%'
            }}
          >Max</CustomButton>
          </Stack>
            <br />
          </Modal>
          <Stack direction="row" spacing={2}>
            <Card
              onClick={this.setModalDai}
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
              }}>Mint AgUSD with DAI</CustomButtonDai>
            </Card>
            {/**/}
            <Card
              onClick={this.setModalUsdc}
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
              }}>Mint AgUSD with USDC</CustomButtonUsdc>
            </Card>
            {/**/}
            <Card
              onClick={this.setModalFusdt}
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
              }}>Mint AgUSD with FUSDT</CustomButtonFusdt>
            </Card>
            {/**/}
            <Card
              onClick={this.setModalFrax}
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
              }}>Mint AgUSD with FRAX</CustomButtonFrax>
            </Card>
            {/**/}
            <Card
              onClick={this.setModalMim}
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
              }}>Mint AgUSD with MIM</CustomButtonMim>
            </Card>
          </Stack>
        </header>
      </div>
    );
  };
}

export default Mint;
