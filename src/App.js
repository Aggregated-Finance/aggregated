import { Routes, Route } from "react-router-dom";
import './App.css';

import Home from "./components/Home/Home.js";
import Mint from "./components/Mint/Mint.js";
import Withdraw from "./components/Withdraw/Withdraw.js";
import Info from "./components/Info/Info.js";

import Navbar from "./components/Navbar/Navbar.js";

import { ethers } from 'ethers';

async function connectWallet() {
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
    const { chainId } = await provider.getNetwork()
    let signer = provider.getSigner();
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0];
    let info = {
      provider: provider,
      account: account,
      signer: signer,
      chainId: chainId
    };
}

function WMint() {
  return (
    <>
      <Navbar />
      <Mint />
    </>
  );
}

function WWithdraw() {
  return (
    <>
      <Navbar />
      <Withdraw />
    </>
  );
}

function WInfo() {
  return (
    <>
      <Navbar />
      <Info />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<WMint />} />
        <Route path="/withdraw" element={<WWithdraw />} />
        <Route path="/info" element={<WInfo />} />
      </Routes>
    </div>
  );
}

export default App;
