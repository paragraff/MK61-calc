import React, { Component } from 'react'
import {connect} from 'react-redux'

import {power as powerAction} from '../Actions/switchPower'
import {switchAngleUnits} from "../Actions/switchAngleUnits"
import {command} from '../Actions/command'
import {power as powerState} from '../constants'
import CalcButton from './calcButton'
import {angleUnits} from '../constants'
import './switchers.css'

const mapDispatchToProps = dispatch => {
  return {
    setPower: powerState => dispatch(powerAction(powerState)),
    setAngleUnits: angleUnit => dispatch(switchAngleUnits(angleUnit)),
    pressButton: buttonCode => dispatch(command(buttonCode)),
  };
};
const mapStateToProps = state => {
  return {
    power: state.power,
    angleUnits: state.angleUnitsSwither
  }
}

class Buttons extends Component {
  constructor(props) {
    super(props)
    this.changePower = this.changePower.bind(this)
    this.changeAngleUnits = this.changeAngleUnits.bind(this)
  }
  changePower(event) {
    this.props.setPower(event.target.checked ? powerState.ON : powerState.OFF)
  }
  changeAngleUnits(event) {
    this.props.setAngleUnits(parseInt(event.target.value, 10))
  }
  pressButton(x, y, event) {
    this.props.pressButton({x, y});
  }
  render() {
    const power = this.props.power
    const angleUnitsState = this.props.angleUnits
    return (
      <div>
        <div className="switchers">
          <div className="power">
            <input type="checkbox" name="power" onChange={this.changePower} value={power}/>
          </div>
          <div className="angle-units">
            <input type="radio"
                   name="angle-unit"
                   value={angleUnits.RAD}
                   onChange={this.changeAngleUnits}
                   checked={angleUnitsState === angleUnits.RAD}
            />
            <input type="radio"
                   name="angle-unit"
                   value={angleUnits.GON}
                   onChange={this.changeAngleUnits}
                   checked={angleUnitsState === angleUnits.GON}
            />
            <input type="radio"
                   name="angle-unit"
                   value={angleUnits.DEG}
                   onChange={this.changeAngleUnits}
                   checked={angleUnitsState === angleUnits.DEG}
            />
          </div>
        </div>
        <div className="buttons">
          <div className="buttons-row">
            <button className="button" onClick={this.pressButton.bind(this, 11, 9)}>F</button>
            <button className="button" onClick={this.pressButton.bind(this, 7, 9)}>ШГ</button>
            <button className="button" onClick={this.pressButton.bind(this, 9, 9)}>ШГ</button>
            <button className="button" onClick={this.pressButton.bind(this, 4, 9)}>В/О</button>
            <button className="button" onClick={this.pressButton.bind(this, 2, 9)}>С/П</button>
          </div>
          <div className="buttons-row">
            <button className="button" onClick={this.pressButton.bind(this, 10, 9)}>K</button>
            <button className="button" onClick={this.pressButton.bind(this, 8, 9)}>П&rarr;Х</button>
            <button className="button" onClick={this.pressButton.bind(this, 6, 9)}>Х&rarr;П</button>
            <button className="button" onClick={this.pressButton.bind(this, 3, 9)}>БП</button>
            <button className="button" onClick={this.pressButton.bind(this, 5, 9)}>ПП</button>
          </div>
          <div className="buttons-row">
            <button className="button" onClick={this.pressButton.bind(this, 9, 1)}>7</button>
            <button className="button" onClick={this.pressButton.bind(this, 10, 1)}>8</button>
            <button className="button" onClick={this.pressButton.bind(this, 11, 1)}>9</button>
            <button className="button" onClick={this.pressButton.bind(this, 3, 8)}>-</button>
            <button className="button" onClick={this.pressButton.bind(this, 5, 8)}>&divide;</button>
          </div>
          <div className="buttons-row">
            <button className="button" onClick={this.pressButton.bind(this, 6, 1)}>4</button>
            <button className="button" onClick={this.pressButton.bind(this, 7, 1)}>5</button>
            <button className="button" onClick={this.pressButton.bind(this, 8, 1)}>6</button>
            <button className="button" onClick={this.pressButton.bind(this, 2, 8)}>+</button>
            <button className="button" onClick={this.pressButton.bind(this, 4, 8)}>&times;</button>
          </div>
          <div className="buttons-row">
            <button className="button" onClick={this.pressButton.bind(this, 3, 1)}>1</button>
            <button className="button" onClick={this.pressButton.bind(this, 4, 1)}>2</button>
            <button className="button" onClick={this.pressButton.bind(this, 5, 1)}>3</button>
            <button className="button" onClick={this.pressButton.bind(this, 6, 8)}>&harr;</button>
            <button className="button" onClick={this.pressButton.bind(this, 11, 8)}>В&uarr;</button>
          </div>
          <div className="buttons-row">
            <button className="button" onClick={this.pressButton.bind(this, 2, 1)}>0</button>
            <button className="button" onClick={this.pressButton.bind(this, 7, 8)}>.</button>
            <button className="button" onClick={this.pressButton.bind(this, 8, 8)}>/-/</button>
            <button className="button" onClick={this.pressButton.bind(this, 9, 8)}>ВП</button>
            <button className="button" onClick={this.pressButton.bind(this, 10, 8)}>Сх</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
