import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [myVal, setResponse] = useState('hi');

  useEffect(() => {
    async function getResponse() {
      const response = await fetch('/hello');
      const body = await response.json();
  
      setResponse(JSON.stringify(body));
    }
    getResponse()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        { myVal }
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
      </header>
    </div>
  );
}

export default App;
