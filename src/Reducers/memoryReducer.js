import createDeepCopyState from './createDeepCopyState'

const memoryReducer = (state, action) => {
  let resultState = createDeepCopyState(state)
  if (action.type === 'MEMORY_CHANGED') {
    resultState.memory = action.payload.memory
    resultState.stack = action.payload.stack
    resultState.program = action.payload.program
    resultState.commandPointer = action.payload.commandPointer
    resultState.returnStack = action.payload.returnsStack
  } else {
    resultState = state
  }
  return resultState
};

export default memoryReducer