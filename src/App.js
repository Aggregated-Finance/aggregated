import { Routes, Route } from "react-router-dom";
import './App.css';

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import Home from "./components/Home/Home.js";
import Mint from "./components/Mint/Mint.js";
import Withdraw from "./components/Withdraw/Withdraw.js";
import Info from "./components/Info/Info.js";

import Navbar from "./components/Navbar/Navbar.js";


import HomeM from "./components-mobile/Home/Home.js";
import MintM from "./components-mobile/Mint/Mint.js";
import WithdrawM from "./components-mobile/Withdraw/Withdraw.js";
import InfoM from "./components-mobile/Info/Info.js"; 

import { ethers } from 'ethers';

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
        <BrowserView>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<WMint />} />
          <Route path="/withdraw" element={<WWithdraw />} />
          <Route path="/info" element={<WInfo />} />
        </BrowserView>
        <MobileView>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<WMint />} />
          <Route path="/withdraw" element={<WWithdraw />} />
          <Route path="/info" element={<WInfo />} />
        </MobileView>
      </Routes>
    </div>
  );
}

export default App;
