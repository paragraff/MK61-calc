import React, {Component} from 'react'
import {connect} from "react-redux";
import {switchAngleUnits} from "../Actions/switchAngleUnits";
import {angleUnits} from '../constants'
import './AngleUnitsSwitcher.css';

const mapDispatchToProps = dispatch => {
  return {
    setAngleUnits: angleUnit => dispatch(switchAngleUnits(angleUnit)),
  };
};
const mapStateToProps = state => {
  return {
    angleUnits: state.angleUnitsSwither,
  }
}

class AngleUnitsSwitcher extends Component {
  constructor (props) {
    super(props)
    this.changeAngleUnits = this.changeAngleUnits.bind(this)
  }
  changeAngleUnits(event) {
    let newAngleUnit = angleUnits.RAD
    if (this.props.angleUnits === angleUnits.RAD) {
      newAngleUnit = angleUnits.GON
    } else if (this.props.angleUnits === angleUnits.GON) {
      newAngleUnit = angleUnits.DEG
    }
    this.props.setAngleUnits(newAngleUnit)
  }
  render () {
    const angleUnit = this.props.angleUnits;
    let unitClass = 'rad';
    if (angleUnit === angleUnits.GON) {
      unitClass = 'gon';
    }
    if (angleUnit === angleUnits.DEG) {
      unitClass = 'deg';
    }
    return (
      <div className="angle-units-switcher">
        <div><label>ГРД</label></div>
        <label>Р</label>
        <svg
          id="angle-units-switcher"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="40"
          viewBox="0 0 120 40"
          onClick={this.changeAngleUnits}
          className={unitClass}
        >
          <rect x="0" y="0" width="120" height="40" fill="#181818" stroke="black"></rect>
          <g>
            <rect x="0" y="0" width="50" height="50" fill="#303030" stroke="#111111"></rect>
            <line x1="5" y1="0" x2="5" y2="40" stroke="#181818" strokeWidth="2"/>
            <line x1="15" y1="0" x2="15" y2="40" stroke="#181818" strokeWidth="2"/>
            <line x1="25" y1="0" x2="25" y2="40" stroke="#181818" strokeWidth="2"/>
            <line x1="35" y1="0" x2="35" y2="40" stroke="#181818" strokeWidth="2"/>
            <line x1="45" y1="0" x2="45" y2="40" stroke="#181818" strokeWidth="2"/>
          </g>
        </svg>
        <label>Г</label>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AngleUnitsSwitcher);