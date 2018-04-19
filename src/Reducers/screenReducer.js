import {screenSymbols} from '../Core/core_constants'
import createDeepCopyState from './createDeepCopyState'
import {powerOffState} from "../constants";

const screenReducer = (state, action) => {
  let resultState
  if (action.type === 'SCREEN_STATE_UPDATE') {
    const dots = action.payload.dots
    const digits = action.payload.digits.map(digit => screenSymbols[digit])
    const bright = action.payload.bright
    const minus = screenSymbols[10]
    const emptyDigit = screenSymbols[15]

    let resultScreen = []

    //set mantissa sign
    resultScreen[0] = (digits[0] === minus ? '-' : '+');

    // set mantissa
    for (let i = 1; i < 9; i++) {
      resultScreen[i * 2 - 1] = (digits[i] === emptyDigit ? 'd' : digits[i])
      resultScreen[i * 2] = dots[i] ? '.' : 's'
    }
    // set exponent sign
    resultScreen[17] = (digits[9] === minus ? '-' : '+');
    // set exponent
    for (let i = 10; i < 12; i++) {
      resultScreen[i * 2 - 2] = (digits[i] === emptyDigit ? 'd' : digits[i])
      resultScreen[i * 2 - 1] = dots[i] ? '.' : 's'
    }

    let screenString = resultScreen.join('')
    if (dots.length === 0 && digits.length === 0) {
      screenString = powerOffState.screen
    }

    resultState = createDeepCopyState(state)

    resultState.screen = screenString

  } else {
    resultState = state
  }
  return resultState
};

export default screenReducer