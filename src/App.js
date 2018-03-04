import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MailForm from './MailForm/MailForm.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SM Tech Challenge</h1>
        </header>
          <MailForm/>
      </div>
    );
  }
}

export default App;
