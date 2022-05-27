import React from 'react';
import '../../App.css';
import "./Nav.css";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

const CustomButton = styled(Button)(({ theme }) => ({
  borderColor: '#ffffff',
  borderRadius: '30px',
  textDecoration: 'none',
  '&:hover': {
    //borderColor: '#ffffff',
    //backgroundColor: '#f0ab7c',
    textDecoration: 'none',
  }
}));


function Navbar() {
  return (
    <div className="navbar" style={{
      paddingTop: '12px'
    }}>
      <Stack direction="row" spacing={2}>
        <CustomButton variant="text">
          <Link to="/" style={{
            textDecoration: 'none',
            color: '#ffffff'
          }}>Home</Link>
        </CustomButton>
        <CustomButton variant="text">
          <Link to="/mint" style={{
            textDecoration: 'none',
            color: '#ffffff'
          }}>Mint</Link>
        </CustomButton>
        <CustomButton variant="text">
          <Link to="/withdraw" style={{
            textDecoration: 'none',
            color: '#ffffff'
          }}>Withdraw</Link>
        </CustomButton>
        <CustomButton variant="text">
          <Link to="/info" style={{
            textDecoration: 'none',
            color: '#ffffff'
          }}>About</Link>
        </CustomButton>
      </Stack>
    </div>
  );
}

export default Navbar;
