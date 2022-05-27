import { Routes, Route } from "react-router-dom";
import './App.css';

import Home from "./components/Home/Home.js";
import Mint from "./components/Mint/Mint.js";
import Withdraw from "./components/Withdraw/Withdraw.js";
import Info from "./components/Info/Info.js";

import Navbar from "./components/Navbar/Navbar.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<><Navbar /> <Mint /></>} />
        <Route path="/withdraw" element={<><Navbar /> <Withdraw /></>} />
        <Route path="/info" element={<><Navbar /><Info /></>} />
      </Routes>
    </div>
  );
}

export default App;
