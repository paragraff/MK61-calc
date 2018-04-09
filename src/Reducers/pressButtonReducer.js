import {power} from '../constants'
import createDeepCopyState from './createDeepCopyState'

const angleUnitsReducer = (state, action) => {
  let resultState = createDeepCopyState(state)
  if (action.type === 'COMMAND' && state.power === power.ON) {
    resultState.lastButton = action.payload
  } else {
    resultState = state
  }
  return resultState
};

export default angleUnitsReducer