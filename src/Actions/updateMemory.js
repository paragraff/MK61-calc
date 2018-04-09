export const updateMemory = (memory, stack, program, commandPointer, returnsStack) => ({
  type: 'MEMORY_CHANGED',
  payload: {
    memory: memory,
    stack: stack,
    program: program,
    commandPointer: commandPointer,
    returnsStack: returnsStack,
  }
})