import '../../App.css';
import constants from '../../constants.js';
import React, { Component, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Card, Modal, Input } from 'web3uikit';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

import Toastify from 'toastify-js'
import "../../toastify.css"

import { ethers, Contract } from 'ethers';
import agabi from '../../AgUSDAbi.js';

import dai from './Images/dai.svg';
import usdc from './Images/usdc.svg';
import fusdt from './Images/fusdt.svg';
import frax from './Images/frax.svg';
import mim from './Images/mim.png';

const CustomButtonDai = styled(Button)(({ _theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#FFB236',
    textDecoration: 'none',
  }
}));

const CustomButtonUsdc = styled(Button)(({ _theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#3B2E4D',
    textDecoration: 'none',
  }
}));

const CustomButtonFusdt = styled(Button)(({ _theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#3BD787',
    textDecoration: 'none',
  }
}));

const CustomButtonFrax = styled(Button)(({ _theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#321821',
    textDecoration: 'none',
  }
}));

const CustomButtonMim = styled(Button)(({ _theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    backgroundColor: '#F4B565',
    textDecoration: 'none',
  }
}));

const CustomButton = styled(Button)(({ _theme }) => ({
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

function toDecimals(t, amt) {
  let t2 = t.toString().split('');
  let ze = "";
  for (var i = 0; i < amt; i++) {
    ze = ze + t2[i];
  }
  return ze;
}


class Withdraw extends Component {

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
      input: 0,
      holding: 0
    }
    this.setModalDai = this.setModalDai.bind(this);
    this.setModalUsdc = this.setModalUsdc.bind(this);
    this.setModalFusdt = this.setModalFusdt.bind(this);
    this.setModalFrax = this.setModalFrax.bind(this);
    this.setModalMim = this.setModalMim.bind(this);

    this.connectWallet = this.connectWallet.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.setMax = this.setMax.bind(this);

    this.burnDai = this.burnDai.bind(this);
    this.burnUsdc = this.burnUsdc.bind(this);
    this.burnFusdt = this.burnFusdt.bind(this);
    this.burnFrax = this.burnFrax.bind(this);
    this.burnMim = this.burnMim.bind(this);
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
        mim: !(this.state.showModal.mim)
      }
    });
  }

  handleChange(event) {
    this.setState({ input: parseFloat(formatInput(event.target.value)) });
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
    const { chainId } = await provider.getNetwork();
    let signer = provider.getSigner();
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0];

    let agUsd = new Contract(constants.agusd,agabi,signer);

    this.setState({
      account: account,
      signer: signer,
      contract: agUsd
    });

    let holding;

    await agUsd.functions.balanceOf(account).then(res => {
      holding = res[0];
    });

    this.setState({
      holding: holding,
    });
  }

  async burnDai() {
    this.state.contract.functions.AgUSDToDAI(ethers.utils.parseEther((this.state.input).toString())).catch(e => {
      console.error(e);
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

  async burnUsdc() {
    this.state.contract.functions.AgUSDToUSDC(ethers.utils.parseEther((this.state.input).toString())).catch(e => {
      console.error(e);
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

  async burnFusdt() {
    this.state.contract.functions.AgUSDToFUSDT(ethers.utils.parseEther((this.state.input).toString())).catch(e => {
      console.error(e);
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

  async burnFrax() {
    this.state.contract.functions.AgUSDToFRAX(ethers.utils.parseEther((this.state.input).toString())).catch(e => {
      console.error(e);
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

  async burnMim() {
    this.state.contract.functions.AgUSDToMIM(ethers.utils.parseEther((this.state.input).toString())).catch(e => {
      console.error(e);
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

  disconnectWallet() {
    this.setState({
      account: null,
      signer: null
    })
  }

  setMax() {
    this.setState({
      input: this.state.holding,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="gluon" style={{
          paddingTop: '0vh'
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
          <h1>The Boson Burner</h1>
          <CustomButton
            variant="outlined"
            style={{
              textDecoration: 'none',
              color: '#ffffff'
            }}
            onClick={this.connectWallet}
          >{this.state.account || "Connect Wallet"}</CustomButton>

          <h2>AgUSD in wallet: {this.state.holding || "None"}</h2>
          <Modal
            cancelText="Approve"
            id="regular"
            width="50vw"
            height="30vh"
            okText="Burn AgUSD!"
            isCancelDisabled={true}
            isVisible={this.state.showModal.dai}
            onCancel={function noRefCheck(){}}
            onCloseButtonPressed={this.setModalDai}
            onOk={this.burnDai}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Redeem AgUSD for DAI</h3>}
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
              placeholder={`AgUSD Balance: ${0}`}
              value={(this.state.input || "")}
            />
            <CustomButton
              onClick={this.setMax}
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
            okText="Burn AgUSD!"
            isCancelDisabled={true}
            isVisible={this.state.showModal.usdc}
            onCancel={function noRefCheck(){}}
            onCloseButtonPressed={this.setModalUsdc}
            onOk={this.burnUsdc}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Redeem AgUSD for USDC</h3>}
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
            placeholder={`AgUSD Balance: ${0}`}
            value={(this.state.input || "")}
          />
          <CustomButton
            onClick={this.setMax}
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
            okText="Burn AgUSD!"
            isCancelDisabled={true}
            isVisible={this.state.showModal.fusdt}
            onCancel={function noRefCheck(){}}
            onCloseButtonPressed={this.setModalFusdt}
            onOk={this.burnFusdt}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Redeem AgUSD for fUSDT</h3>}
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
            placeholder={`AgUSD Balance: ${0}`}
            value={(this.state.input || "")}
          />
          <CustomButton
            onClick={this.setMax}
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
            okText="Burn AgUSD!"
            isCancelDisabled={true}
            isVisible={this.state.showModal.frax}
            onCancel={function noRefCheck(){}}
            onCloseButtonPressed={this.setModalFrax}
            onOk={this.burnFrax}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Redeem AgUSD for FRAX</h3>}
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
            placeholder={`AgUSD Balance: ${0}`}
            value={(this.state.input || "")}
          />
          <CustomButton
            onClick={this.setMax}
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
            okText="Burn AgUSD!"
            isCancelDisabled={true}
            isVisible={this.state.showModal.mim}
            onCancel={function noRefCheck(){}}
            onCloseButtonPressed={this.setModalMim}
            onOk={this.burnMim}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Redeem AgUSD With MIM</h3>}
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
            placeholder={`AgUSD Balance: ${0}`}
            value={(this.state.input || "")}
          />
          <CustomButton
            onClick={this.setMax}
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
              }}>Get DAI for AgUSD</CustomButtonDai>
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
              }}>Get USDC for AgUSD</CustomButtonUsdc>
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
              }}>Get FUSDT for AgUSD</CustomButtonFusdt>
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
              }}>Get FRAX for AgUSD</CustomButtonFrax>
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
              }}>Get MIM for AgUSD</CustomButtonMim>
            </Card>
          </Stack>
        </header>
      </div>
    );
  };
}

export default Withdraw;
