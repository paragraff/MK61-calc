import React, { Component } from 'react'
import {connect} from 'react-redux'

import {power as powerAction} from '../Actions/switchPower'
import {switchAngleUnits} from "../Actions/switchAngleUnits"
import {command} from '../Actions/command'
import {power as powerState} from '../constants'
import CalcButton from './calcButton'
import {angleUnits} from '../constants'
import {ButtonColors} from "./button-colors"
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
            <CalcButton onClick={this.pressButton.bind(this, 11, 9)} value={{text: 'F'}} color={ButtonColors.YELLOW} />
            <CalcButton onClick={this.pressButton.bind(this, 7, 9)} value={{text: 'ШГ', up: '→'}} functionalValue={{text: 'x<0'}} color={ButtonColors.BLACK}/>
            <CalcButton onClick={this.pressButton.bind(this, 9, 9)} value={{text: 'ШГ', up: '←'}} functionalValue={{text: 'x=0'}} color={ButtonColors.BLACK}/>
            <CalcButton onClick={this.pressButton.bind(this, 4, 9)} value={{text: 'В/0'}} functionalValue={{text: 'x≥0'}} color={ButtonColors.BLACK}/>
            <CalcButton onClick={this.pressButton.bind(this, 2, 9)} value={{text: 'С/П'}} functionalValue={{text: 'x≠0'}} color={ButtonColors.BLACK}/>
          </div>
          <div className="buttons-row">
            <CalcButton onClick={this.pressButton.bind(this, 10, 9)} value={{text: 'K'}} color={ButtonColors.BLUE}/>
            <CalcButton onClick={this.pressButton.bind(this, 8, 9)} value={{text: 'П→X'}} functionalValue={{text: 'L0'}} color={ButtonColors.BLACK}/>
            <CalcButton onClick={this.pressButton.bind(this, 6, 9)} value={{text: 'X→П'}} functionalValue={{text: 'L1'}} color={ButtonColors.BLACK}/>
            <CalcButton onClick={this.pressButton.bind(this, 3, 9)} value={{text: 'БП'}} functionalValue={{text: 'L2'}} color={ButtonColors.BLACK}/>
            <CalcButton onClick={this.pressButton.bind(this, 5, 9)} value={{text: 'ПП'}} functionalValue={{text: 'L3'}} color={ButtonColors.BLACK}/>
          </div>
          <div className="buttons-row">
            <CalcButton onClick={this.pressButton.bind(this, 9, 1)} value={{text: '7'}} functionalValue={{text: 'sin'}} extendValue={{text: '[x]'}} color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 10, 1)} value={{text: '8'}} functionalValue={{text: 'cos'}} extendValue={{text: '{x}'}} color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 11, 1)} value={{text: '9'}} functionalValue={{text: 'tg'}} extendValue={{text: 'max'}} color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 3, 8)} value={{text: '-'}} functionalValue={{text: '√'}} color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 5, 8)} value={{text: '÷'}} functionalValue={{text: '1/x'}} color={ButtonColors.WHITE}/>
          </div>
          <div className="buttons-row">
            <CalcButton onClick={this.pressButton.bind(this, 6, 1)} value={{text: '4'}} functionalValue={{text: 'sin', exp: '-1'}} extendValue={{text: '|x|'}} color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 7, 1)} value={{text: '5'}} functionalValue={{text: 'cos', exp: '-1'}} extendValue={{text: 'ЗН'}} color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 7, 1)} value={{text: '6'}} functionalValue={{text: 'tg', exp: '-1'}} extendValue={{text: '°\'', up:'←'}} color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 2, 8)} value={{text: '+'}} functionalValue={{text: 'π'}} extendValue={{text: '°\'', up:'→'}} color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 4, 8)} value={{text: '×'}} functionalValue={{text: 'x', exp: '2'}} color={ButtonColors.WHITE}/>
          </div>
          <div className="buttons-row">
            <CalcButton onClick={this.pressButton.bind(this, 3, 1)} value={{text: '1'}} functionalValue={{text: 'e', exp: 'x'}} color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 4, 1)} value={{text: '2'}} functionalValue={{text: 'lg'}} color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 5, 1)} value={{text: '3'}} functionalValue={{text: 'ln'}} extendValue={{text: '°\'\"', up:'←'}} color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 6, 8)} value={{text: '↔'}} functionalValue={{text: 'x', exp: 'y'}} extendValue={{text: '°\'\"', up:'→'}} color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 11, 8)} value={{text: 'В↑'}} functionalValue={{text: 'Вх'}} extendValue={{text: 'СЧ'}} memoryCell="e" color={ButtonColors.WHITE}/>
          </div>
          <div className="buttons-row">
            <CalcButton onClick={this.pressButton.bind(this, 2, 1)} value={{text: '0'}} functionalValue={{text: '10', exp:'x'}} extendValue={{text: 'НОП'}} color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 7, 8)} value={{text: '.'}} functionalValue={{text: 'Ѻ'}} extendValue={{text: '˄'}} memoryCell="a" color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 8, 8)} value={{text: '/-/'}} functionalValue={{text: 'AВТ'}} extendValue={{text: '˅'}} memoryCell="b" color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 9, 8)} value={{text: 'ВП'}} functionalValue={{text: 'ПРГ'}} extendValue={{text: '⨁'}} memoryCell="c" color={ButtonColors.WHITE}/>
            <CalcButton onClick={this.pressButton.bind(this, 10, 8)} value={{text: 'Сх'}} functionalValue={{text: 'CF'}} extendValue={{text: 'ИНВ'}} memoryCell="d" color={ButtonColors.RED}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
