import React, {Component} from 'react'
import './button.css'

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
    const functionalValue = this.functionalValue !== undefined ? <div className='fn'>{this.functionalValue.text}</div> : ''
    const extendValue = this.extendValue !== undefined ? <div className='k'>{this.extendValue.text}</div> : ''
    return (
      <div className={`button ${this.memoryCell ? 'memory' : ''} ${this.memoryCell === 'e' ? 'right' : ''}`}>
        <div className="button-describe">
          {functionalValue}
          {extendValue}
        </div>
        <div className="button-container">
          <button className={`${this.props.color}`} onClick={this.props.onClick}>
              <span>{this.value.up}</span>
              <span>{this.value.text}</span>
          </button>
        </div>
      </div>
    )
  }
}

export default CalcButton;