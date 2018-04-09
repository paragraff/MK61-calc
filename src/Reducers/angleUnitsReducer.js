import {power, angleUnits} from '../constants'
import createDeepCopyState from './createDeepCopyState'

const angleUnitsReducer = (state, action) => {
  let resultState = createDeepCopyState(state)
  if (action.type === 'SWITCH_ANGLE_MODE') {
    resultState.angleUnitsSwither = action.payload
  } else {
    resultState = state
  }
  return resultState
};

export default angleUnitsReducer