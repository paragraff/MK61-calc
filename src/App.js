import React, { Component } from 'react';
import './App.css';

import Screen from './Screen'
import Buttons from './Buttons'

class App extends Component {
  render() {
    return (
      <div>
        <Screen></Screen>
        <Buttons></Buttons>
      </div>
    );
  }
}

export default App;
