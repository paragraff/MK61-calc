import React, { Component } from 'react'
import {connect} from 'react-redux'
import './App.css';

import Screen from './Screen'
import Buttons from './Buttons'

const mapStateToProps = state => {
  return { screen: state.screen };
};

class App extends Component {
  constructor (props) {
    super(props);
    this.props = props;
  }
  render() {
    const {screen} = this.props;
    return (
      <div>
        <Screen value={screen}></Screen>
        <Buttons></Buttons>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
