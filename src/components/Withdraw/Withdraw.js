import '../../App.css';
import constants from '../../constants.js';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Card, Modal, Input } from 'web3uikit';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

import Toastify from 'toastify-js'
import "../../toastify.css"

import logo from '../../AgUSD.png';
import arrow from './single-arrow.svg';

import { Type } from '../Text';
import { ButtonMax } from '../Button';
import CurrencyLogo from '../Currency';

import { ethers, Contract } from 'ethers';
import agabi from '../../AgUSDAbi.js';

import { truncateAddress } from '../../helpers/truncateAddress.js';

import DeleteIcon from '@mui/icons-material/Delete';

import dai from './Images/dai.svg';
import usdc from './Images/usdc.svg';
import fusdt from './Images/fusdt.svg';
import frax from './Images/frax.svg';
import mim from './Images/mim.png';

import { Flex, Box, Image } from 'rebass/styled-components';

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
    transition:all 0.3s;
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

//const prov = new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools');

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

class Withdraw extends Component {

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
      input: 0,
      holding: 0
    }
    this.setModalDai = this.setModalDai.bind(this);
    this.setModalUsdc = this.setModalUsdc.bind(this);
    this.setModalFusdt = this.setModalFusdt.bind(this);
    this.setModalFrax = this.setModalFrax.bind(this);
    this.setModalMim = this.setModalMim.bind(this);

    this.connectWallet = this.connectWallet.bind(this);
    this.disconnectWallet = this.disconnectWallet.bind(this);

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
    //const { chainId } = await provider.getNetwork();
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
    this.state.contract.functions.AgUSDToUSDC((ethers.utils.parseEther((this.state.input).toString())).toString()).catch(e => {

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
      input: ((this.state.holding)/10**18).toFixed(15),
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
          <h1>The Boson Burner</h1>
          <CustomButton
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
          </CustomButton>
          <h2>AgUSD in wallet: {(parseInt(this.state.holding._hex,16)/10**18).toFixed(6).toString() || "None"}</h2>
          <Stack direction="row" margin={2}>
            <CustomButtonDai style={{ borderRadius: '30px' }} variant="outline" onClick={this.setModalDai}>Burn with DAI</CustomButtonDai>
            <CustomButtonUsdc style={{ borderRadius: '30px' }} variant="outline" onClick={this.setModalUsdc}>Burn with USDC</CustomButtonUsdc>
            <CustomButtonFusdt style={{ borderRadius: '30px' }} variant="outline" onClick={this.setModalFusdt}>Burn with FUSDT</CustomButtonFusdt>
            <CustomButtonFrax style={{ borderRadius: '30px' }} variant="outline" onClick={this.setModalFrax}>Burn with FRAX</CustomButtonFrax>
            <CustomButtonMim style={{ borderRadius: '30px' }} variant="outline" onClick={this.setModalMim}>Burn with MIM</CustomButtonMim>
          </Stack>
          {this.state.showModal.dai ? (<>
          <Wrapper>
            <Flex p="10px 0" justifyContent={"space-between"}>
              <Box>
                <Type.SM color={"secondary"}>
                  Input
                </Type.SM>

                <Flex justifyContent="space-between" alignItems="center" mt="5px" marginRight="4vw">
                  <InputAmount placeholder={((this.state.holding)/10**18) || "0.0"} min="0" value={this.state.input || ""} width="40vw" onChange={this.handleChange} />
                  <ButtonMax width={"4vw"} onClick={this.setMaxDai}>
                    MAX
                  </ButtonMax>
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={logo}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">AgUSD</Type.LG>
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          <Link to="/mint"><Image src={arrow} size="20px" my="15px"/></Link>
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
                      src={dai}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">DAI</Type.LG>
                    {/*<Image src={dai} size="10px" />*/}
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          {this.state.account ?
            (<ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.burnDai}
            >Burn</ButtonSwap>) :
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
                  <InputAmount placeholder={((this.state.holding)/10**18) || "0.0"} min="0" value={this.state.input || ""} width="40vw" onChange={this.handleChange} />
                  <ButtonMax width={"4vw"} onClick={this.setMaxUsdc}>
                    MAX
                  </ButtonMax>
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={logo}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">AgUSD</Type.LG>
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          <Link to="/mint"><Image src={arrow} size="20px" my="15px"/></Link>
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
                      src={usdc}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">USDC</Type.LG>
                    {/*<Image src={dai} size="10px" />*/}
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          {this.state.account ?
            (<ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.burnUsdc}
            >Burn</ButtonSwap>) :
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
                  <InputAmount placeholder={((this.state.holding)/10**18) || "0.0"} min="0" value={this.state.input || ""} width="40vw" onChange={this.handleChange} />
                  <ButtonMax width={"4vw"} onClick={this.setMaxFusdt}>
                    MAX
                  </ButtonMax>
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={logo}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">AgUSD</Type.LG>
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          <Link to="/mint"><Image src={arrow} size="20px" my="15px"/></Link>
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
                      src={fusdt}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">fUSDT</Type.LG>
                    {/*<Image src={dai} size="10px" />*/}
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          {this.state.account ?
            (<ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.burnFusdt}
            >Burn</ButtonSwap>) :
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
                  <InputAmount placeholder={((this.state.holding)/10**18) || "0.0"} min="0" value={this.state.input || ""} width="40vw" onChange={this.handleChange} />
                  <ButtonMax width={"4vw"} onClick={this.setMaxFrax}>
                    MAX
                  </ButtonMax>
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={logo}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">AgUSD</Type.LG>
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          <Link to="/mint"><Image src={arrow} size="20px" my="15px"/></Link>
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
                      src={frax}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">FRAX</Type.LG>
                    {/*<Image src={dai} size="10px" />*/}
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          {this.state.account ?
            (<ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.burnFrax}
            >Burn</ButtonSwap>) :
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
                  <InputAmount placeholder={((this.state.holding)/10**18) || "0.0"} min="0" value={this.state.input || ""} width="40vw" onChange={this.handleChange} />
                  <ButtonMax width={"4vw"} onClick={this.setMaxMim}>
                    MAX
                  </ButtonMax>
                  <TokenInfo onClick={function noRefCheck(){}}>
                    <CurrencyLogo
                      style={{ verticalAlign: "middle" }}
                      currency={"DAI"}
                      size={"25px"}
                      src={logo}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">AgUSD</Type.LG>
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          <Link to="/mint"><Image src={arrow} size="20px" my="15px"/></Link>
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
                      src={mim}
                    />
                    <Type.LG color="text1" ml="7px" mr="9px">MIM</Type.LG>
                    {/*<Image src={dai} size="10px" />*/}
                  </TokenInfo>
                </Flex>
              </Box>
            </Flex>
          </Wrapper>
          {this.state.account ?
            (<ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.burnMim}
            >Burn</ButtonSwap>) :
            (<ButtonSwap style={{
              width: '75vh',
            }}
              onClick={this.connectWallet}
            >Connect Wallet</ButtonSwap>)}</>) : <div/>}
          <br /><br />
        </header>
      </div>
    );
  };
}

export default Withdraw;
