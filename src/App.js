import { Routes, Route } from "react-router-dom";
import './App.css';

import { BrowserView, MobileView } from 'react-device-detect';

import Home from "./components/Home/Home.js";
import Mint from "./components/Mint/Mint.js";
import Withdraw from "./components/Withdraw/Withdraw.js";
import Info from "./components/Info/Info.js";
import Footer from "./components/Footer/Footer.js";

import NavbarHeader from "./components/Navbar/Navbar.js";

import HomeM from "./components-mobile/Home/Home.js";
import MintM from "./components-mobile/Mint/Mint.js";
import WithdrawM from "./components-mobile/Withdraw/Withdraw.js";
import InfoM from "./components-mobile/Info/Info.js";

/*function Scrollbar1() {
  return (
    <Scrollbar
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeight
      autoHeightMin={0}
      autoHeightMax={200}
      universal={true}
    />
  );
}*/


function WMint() {
  return (
    <><NavbarHeader /><Mint /><Footer /></>
  );
}

function WWithdraw() {
  return (
    <><NavbarHeader /><Withdraw /><Footer /></>
  );
}

function WInfo() {
  return (
    <><NavbarHeader /><Info /><Footer /></>
  );
}

function App() {
  return (
    <div className="Apph">
      <BrowserView>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<WMint />} />
            <Route path="/withdraw" element={<WWithdraw />} />
            <Route path="/info" element={<WInfo />} />
          </Routes>
      </BrowserView>

      <MobileView>
          <Routes>
            <Route path="/" element={<HomeM />} />
            <Route path="/mint" element={<MintM />} />
            <Route path="/withdraw" element={<WithdrawM />} />
            <Route path="/info" element={<InfoM />} />
          </Routes>
      </MobileView>
    </div>
  );
}

export default App;
