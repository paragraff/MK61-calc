import {power, powerOnState, powerOffState} from '../constants'
import reducer from '../reducer'

const powerReducer = (state, action) => {
  let resultState
  if (action.type === 'SWITCH_POWER') {
    resultState = action.payload === power.ON ? powerOnState : powerOffState
  } else {
    resultState = state
  }
  return resultState
};

reducer.register(powerReducer)

export default powerReducer