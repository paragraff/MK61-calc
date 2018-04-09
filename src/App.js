import React, { Component } from 'react'
import {connect} from 'react-redux'
import './App.css'

import Screen from './Screen'
import Buttons from './Buttons/buttons'

import {power as powerState} from './constants'

import {updateScreen} from './Actions/updateScreen'

const mapStateToProps = state => {
  return {
    screen: state.screen,
    angleUnits: state.angleUnitsSwither,
    lastButton: state.lastButton,
    power: state.power,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showScreen: (screen, dots, bright) => dispatch(updateScreen(screen, dots, bright)),
    setMemory: (memory, stack, commandPointer, stackReturns, program) => {console.log('set memory', memory, stack, commandPointer, stackReturns, program)},
  }
}

class App extends Component {
  componentDidMount () {
    this.props.core.changeAngleUnits(this.props.angleUnits)
  }
  componentWillUnmount () {
    this.props.core.turnOff()
  }
  componentDidUpdate (prevProps) {
    const {core, lastButton, angleUnits, power} = this.props
    if (power === powerState.ON && power !== prevProps.power) {
      core.turnOn(this.props.showScreen, this.props.setMemory)
    }

    if (power === powerState.OFF && power !== prevProps.power) {
      core.turnOff()
    }

    if (angleUnits !== prevProps.angleUnits) {
      core.changeAngleUnits(angleUnits)
    }
    if (lastButton && lastButton !== prevProps.lastButton && power === powerState.ON) {
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
