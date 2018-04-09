import React, {Component} from 'react'
// import './button.css'

class CalcButton extends Component {
  constructor (props) {
    super(props)
    this.value = props.value
    this.functionalValue = props.functionalValue
    this.extendValue = props.extendValue
    this.memoryCell = props.memoryCell
    this.color = props.color
  }
  render () {
    return (
      <div></div>
    )
  }
}

export default CalcButton;