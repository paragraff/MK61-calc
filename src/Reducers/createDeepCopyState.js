const createDeepCopyState = state => {
  return {
    lastButton: (state && state.lastButton) ? {...state.lastButton} : undefined,
    screen: state.screen,
    power: state.power,
    angleUnitsSwither: state.angleUnitsSwither,
    stack: [].concat(state.stack),
    memory: [].concat(state.memory),
    program: [].concat(state.program),
    returnStack: state.returnStack,
    commandPointer: state.commandPointer,
  }
}

export default createDeepCopyState