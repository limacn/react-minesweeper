import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GamePanel from './pages/GamePanel';
import styled from 'styled-components';

function App() {
  const [size,setSize]=useState(8);
  const [logoClicked,setLogoClicked]=useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className={logoClicked?"App-logo-clicked":"App-logo"} alt="logo" 
        onClick={()=>setLogoClicked(!logoClicked)} />
        <ButtonGroup>
          <Button onClick={()=>{setSize(8)}}>8</Button>
          <Button onClick={()=>{setSize(10)}}>10</Button>  
          {/* <Button onClick={()=>{setSize(12)}}>12</Button>         
          <Button onClick={()=>{setSize(16)}}>16</Button> */}
        </ButtonGroup>
        <GamePanel size={size} key={Date.now()}/>
        {/* <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
const ButtonGroup=styled.div`
  display:flex;
  flex-direction:row;
  gap:10px;
`
const Button=styled.button`
  font-size:large;
  padding:10px 20px;
  border-radius:10px;
  cursor: pointer;
`