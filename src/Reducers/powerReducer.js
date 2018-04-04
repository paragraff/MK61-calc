import {power, powerOnState, powerOffState} from '../constants'

const powerReducer = (state, action) => {
  let resultState
  if (action.type === 'SWITCH_POWER') {
    resultState = action.payload === power.ON ? powerOnState : powerOffState
  } else {
    resultState = state
  }
  return resultState
};

export default powerReducer