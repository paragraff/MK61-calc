import {power, powerOnState, powerOffState} from '../constants'
import createDeepCopyState from './createDeepCopyState'

const powerReducer = (state, action) => {
  let resultState = createDeepCopyState(state)
  if (action.type === 'SWITCH_POWER') {
    resultState.power = action.payload
    resultState.screen = action.payload === power.ON ? powerOnState.screen : powerOffState.screen
  } else {
    resultState = state
  }
  return resultState
};

export default powerReducer