import React from 'react';
import MyTable from './components/MyTable'
import './stylesheets/login.css'
import LoginUser from './auth/LoginUser';

function App() {
  return (
    <div className="container">
      {/* <header className="App-header">
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
      </header> */}

      <LoginUser />

      {/* <MyTable /> */}
      
    </div>
  );
}

export default App;
