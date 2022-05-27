import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

import Home from "./components/Home/Home.js";
import Mint from "./components/Mint/Mint.js";
import Withdraw from "./components/Withdraw/Withdraw.js";
import Info from "./components/Info/Info.js";

import Navbar from "./components/Navbar/Navbar.js";

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<><Navbar /> <Mint /></>} />
        <Route path="/withdraw" element={<><Navbar /> <Withdraw /></>} />
        <Route path="/info" element={<><Navbar /><Withdraw /></>} />
      </Routes>
    </div>
  );
}

export default App;
