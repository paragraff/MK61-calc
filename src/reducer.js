import {powerOffState} from "./constants";

const rootReducer = (state = powerOffState, action) => {
  const newState = reducers.reduce((currState, reducer) => (reducer(currState, action)), state)
  return newState
}

let reducers = [];

rootReducer.register = function (reducer) {
  reducers.push(reducer);
}

export default rootReducer;