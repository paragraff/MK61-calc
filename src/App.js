import React, { Component } from 'react'
import {connect} from 'react-redux'
import './App.css'

import Screen from './Screen'
import Buttons from './Buttons/buttons'

import {power as powerState} from './constants'

const mapStateToProps = state => {
  return {
    screen: state.screen,
    angleUnits: state.angleUnitsSwither,
    lastButton: state.lastButton,
    power: state.power,
  };
};

class App extends Component {
  componentDidMount () {
    this.props.core.changeAngleUnits(this.props.angleUnits)
  }
  componentDidUpdate (prevProps) {
    const {core, lastButton, angleUnits} = this.props
    if (angleUnits !== prevProps.angleUnits) {
      core.changeAngleUnits(angleUnits)
    }
    if (lastButton && lastButton !== prevProps.lastButton && this.props.power === powerState.ON) {
      core.pressButton(lastButton.x, lastButton.y)
    }
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
