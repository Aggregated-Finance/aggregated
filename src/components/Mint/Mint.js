import '../../App.css';
import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import { Card, Modal, Input } from 'web3uikit';
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
      }
    }
    this.setModalDai = this.setModalDai.bind(this);
    this.setModalUsdc = this.setModalUsdc.bind(this);
    this.setModalFusdt = this.setModalFusdt.bind(this);
    this.setModalFrax = this.setModalFrax.bind(this);
    this.setModalMim = this.setModalMim.bind(this);
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

  render() {
    return (
      <div className="App">
        <header className="gluon" style={{
          paddingTop: '0vh'
        }}>
          <h1>The Gluon Minter</h1>
          <h2>AgUSD Total Value Locked: ${this.state.tvl}</h2>
          <Modal
            cancelText="Discard Changes"
            id="regular"
            width="50vw"
            height="30vh"
            okText="Save Changes"
            isVisible={this.state.showModal.dai}
            onCancel={this.setModalDai}
            onCloseButtonPressed={this.setModalDai}
            onOk={function noRefCheck(){}}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Mint AgUSD With DAI</h3>}
            style={{
              backgroundImage: 'alinear-gradient(135deg, rgb(240, 171, 124), rgb(192, 88, 17), rgb(136, 61, 12))',
            }}
          >
            <Input
              alabel="Amount"
              width="100%"
              style={{
                fontFamily: 'Montserrat'
              }}
              placeholder={`DAI Balance: ${this.state.holdings.dai}`}
            />
            <br />
          </Modal>
          <Modal
            cancelText="Discard Changes"
            id="regular"
            width="50vw"
            height="30vh"
            okText="Save Changes"
            isVisible={this.state.showModal.usdc}
            onCancel={this.setModalUsdc}
            onCloseButtonPressed={this.setModalUsdc}
            onOk={function noRefCheck(){}}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Mint AgUSD With USDC</h3>}
            style={{
              backgroundImage: 'alinear-gradient(135deg, rgb(240, 171, 124), rgb(192, 88, 17), rgb(136, 61, 12))',
            }}
          >
            <Input
              alabel="Amount"
              width="100%"
              style={{
                fontFamily: 'Montserrat'
              }}
              placeholder={`USDC Balance: ${this.state.holdings.usdc}`}
            />
            <br />
          </Modal>
          <Modal
            cancelText="Discard Changes"
            id="regular"
            width="50vw"
            height="30vh"
            okText="Save Changes"
            isVisible={this.state.showModal.fusdt}
            onCancel={this.setModalFusdt}
            onCloseButtonPressed={this.setModalFusdt}
            onOk={function noRefCheck(){}}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Mint AgUSD With fUSDT</h3>}
            style={{
              backgroundImage: 'alinear-gradient(135deg, rgb(240, 171, 124), rgb(192, 88, 17), rgb(136, 61, 12))',
            }}
          >
            <Input
              alabel="Amount"
              width="100%"
              style={{
                fontFamily: 'Montserrat'
              }}
              placeholder={`fUSDT Balance: ${this.state.holdings.fusdt}`}
            />
            <br />
          </Modal>
          <Modal
            cancelText="Discard Changes"
            id="regular"
            width="50vw"
            height="30vh"
            okText="Save Changes"
            isVisible={this.state.showModal.frax}
            onCancel={this.setModalFrax}
            onCloseButtonPressed={this.setModalFrax}
            onOk={function noRefCheck(){}}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Mint AgUSD With FRAX</h3>}
            style={{
              backgroundImage: 'alinear-gradient(135deg, rgb(240, 171, 124), rgb(192, 88, 17), rgb(136, 61, 12))',
            }}
          >
            <Input
              alabel="Amount"
              width="100%"
              style={{
                fontFamily: 'Montserrat'
              }}
              placeholder={`FRAX Balance: ${this.state.holdings.frax}`}
            />
            <br />
          </Modal>
          <Modal
            cancelText="Discard Changes"
            id="regular"
            width="50vw"
            height="30vh"
            okText="Save Changes"
            isVisible={this.state.showModal.mim}
            onCancel={this.setModalMim}
            onCloseButtonPressed={this.setModalMim}
            onOk={function noRefCheck(){}}
            title={<h3 style={{
              fontFamily: 'Montserrat'
            }}>Mint AgUSD With MIM</h3>}
            style={{
              backgroundImage: 'alinear-gradient(135deg, rgb(240, 171, 124), rgb(192, 88, 17), rgb(136, 61, 12))',
            }}
          >
            <Input
              alabel="Amount"
              width="100%"
              style={{
                fontFamily: 'Montserrat'
              }}
              placeholder={`MIM Balance: ${this.state.holdings.mim}`}
            />
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
