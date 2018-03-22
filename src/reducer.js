import {angleUnits, power} from "./constants";

const initState = {
  screen: '',
  power: power.OFF,
  angleUnitsSwither: angleUnits.DEG,
  stack: [],
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  program: [],
}

const rootReducer = (state = initState, action) => {
  return {}
}

export default rootReducer;