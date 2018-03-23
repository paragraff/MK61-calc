import {angleUnits, power} from "./constants";

const initState = {
  screen: 's0ssssssssss',
  power: power.OFF,
  angleUnitsSwither: angleUnits.DEG,
  stack: [],
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  program: [],
}

const rootReducer = (state = initState, action) => {
  return Object.assign({}, initState)
}

export default rootReducer;