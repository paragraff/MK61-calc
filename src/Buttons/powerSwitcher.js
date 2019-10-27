import React, {Component} from 'react'
import {connect} from "react-redux";
import {power as powerAction} from "../Actions/switchPower";
import './powerSwitcher.css'
import {power as powerState} from "../constants";

const mapDispatchToProps = dispatch => {
  return {
    setPower: powerState => dispatch(powerAction(powerState))
  };
};
const mapStateToProps = state => {
  return {
    power: state.power
  }
}

class PowerSwitcher extends Component {
  constructor (props) {
    super(props)
    this.changePower = this.changePower.bind(this)
  }
  changePower() {
    this.props.setPower(this.props.power ? powerState.OFF : powerState.ON)
  }
  render () {
    const power = this.props.power
    return (
      <div className="power-switcher">
        <svg
          id="power-switcher"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="40"
          viewBox="0 0 100 40"
          onClick={this.changePower}
          className={power ? 'on' : 'off'}
        >
          <rect x="0" y="0" width="100" height="40" fill="#181818" stroke="black"></rect>
          <g>
            <rect x="0" y="0" width="40" height="40" fill="#303030" stroke="#111111"></rect>
            <line x1="5" y1="0" x2="5" y2="40" stroke="#181818" strokeWidth="2"/>
            <line x1="15" y1="0" x2="15" y2="40" stroke="#181818" strokeWidth="2"/>
            <line x1="25" y1="0" x2="25" y2="40" stroke="#181818" strokeWidth="2"/>
            <line x1="35" y1="0" x2="35" y2="40" stroke="#181818" strokeWidth="2"/>
          </g>
        </svg>
        <label for="power-switcher">Вкл</label>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PowerSwitcher);