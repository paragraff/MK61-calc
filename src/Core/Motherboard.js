import {memoryPages, memoryPageOffsets, stackPages, stackPageOffests, returnPages, commandPointerAddress, screenSymbols} from './core_constants'

class Motherboard {
  constructor (factory, firmware1302, firmware1303, firmware1306) {
    this.firmware1302 = firmware1302
    this.firmware1303 = firmware1303
    this.firmware1306 = firmware1306
    this.chipFactory = factory
  }

  tick () {
    const privateTickExchange = _tickExchange.bind(this)
    // data cycle between chips
    privateTickExchange(this.IK1302, this.IR22)

    privateTickExchange(this.IK1303, this.IK1302)

    privateTickExchange(this.IK1306, this.IK1303)

    privateTickExchange(this.IR21, this.IK1306)

    privateTickExchange(this.IR22, this.IR21)

    this.IK1302.setMByTick(this.IR22.out)
  }

  step () {
    this.IK1303.buttonPressed(this.angleUnits, 1)

    for (let i = 1; i <= 560; i++) {

      for (let j = 0; j < 42; j++) {
        this.tick();
      }

      if (this.IK1302.screenShouldUpdate) {

        // read the mantissa screen state
        for (let j = 0; j <= 8; j++) {
          this.screen[j] = this.IK1302.R[(8 - j) * 3];
        }

        // read the exponent screen state
        for (let j = 0; j <= 2; j++) {
          this.screen[j + 9] = this.IK1302.R[(11 - j) * 3];
        }

        // read the dot position for the mantissa
        for (let j = 0; j <= 8; j++) {
          this.dotScreen[j] = this.IK1302.dots[9 - j];
        }

        // read the dot position for the exponent
        for (let j = 0; j <= 2; j++) {
          this.dotScreen[j + 9] = this.IK1302.dots[12 - j];
        }

        this.IK1302.screenShouldUpdate = false

      }

    }

    let update = false;

    for (let i = 0; i <= 12; i++) {

      if (this.oldScreen[i] !== this.screen[i]) {
        update = true;
      }

      this.oldScreen[i] = this.screen[i];

    }

    if (update) {
      this.screenHandler(this.screen, this.dotScreen, true)
    }

    this.IK1302.buttonPressed(0, 0);

    if (this.IR21.tickCount === 84) {
      this.readState(1);
    }
  }

  readState (offset) {

    const privateReadMemory = _readFromMemory.bind(this)

    let memory = []
    for (let i = 0; i < 15; i++) {
      memory[i] = privateReadMemory(memoryPages[memoryPageOffsets[offset][i]][0], memoryPages[memoryPageOffsets[offset][i]][1] - 8);
    }
    const memoryChange = _hasDiff(memory, this.oldMemory)

    let stack = []
    for (let i = 0; i < 5; i++) {
      stack[i] = privateReadMemory(stackPages[stackPageOffests[offset][i]][0], stackPages[stackPageOffests[offset][i]][1]);
    }
    const stackChange = _hasDiff(stack, this.oldStack)

    let commandPointer = screenSymbols[this.IK1302.R[commandPointerAddress]] + screenSymbols[this.IK1302.R[commandPointerAddress - 3]];
    const commandPointerChange = commandPointer !== this.oldCommandPointer

    let stackReturns = []
    for (let i = 0; i < 5; i++) {
      stackReturns[i] = screenSymbols[this.IK1302.R[returnPages[i]]] + screenSymbols[this.IK1302.R[returnPages[i] - 3]];
    }
    const returnsStackChange = _hasDiff(stackReturns, this.oldReturnStack)

    const program = []
    const programChange = _hasDiff(program, this.oldProgram)

    if (memoryChange || stackChange || commandPointerChange || returnsStackChange || programChange) {
      this.memoryHandler(memory, stack, commandPointer, stackReturns, program)
      this.oldMemory = memory
      this.oldStack = stack
      this.oldCommandPointer = commandPointer
      this.oldReturnStack = stackReturns
      this.oldProgram = program
    }

  }

  pressButton (x, y) {
    this.IK1302.buttonPressed(x, y)
    this.step()
  }

  changeAngleUnits (value) {
    this.angleUnits = value;
  }

  turnOn (screenHandler, memoryHandler) {
    this.screenHandler = screenHandler
    this.memoryHandler = memoryHandler

    // create chip instances
    this.IK1302 = this.chipFactory.createIK13(this.firmware1302)
    this.IK1303 = this.chipFactory.createIK13(this.firmware1303)
    this.IK1306 = this.chipFactory.createIK13(this.firmware1306)
    this.IR21 = this.chipFactory.createIR2()
    this.IR22 = this.chipFactory.createIR2()

    this.screen = []
    this.oldScreen = []
    this.dotScreen = []
    this.oldMemory = []
    this.oldStack = []
    this.oldReturnStack = []
    this.oldProgram = []
    this.oldCommandPointer = 0

    // start executing
    this.timer = setInterval(this.step.bind(this), 300)
    this.step();
  }

  turnOff () {
    clearInterval(this.timer)

    this.screen = []
    this.dotScreen = []
    this.oldScreen = []
    this.IK1302 = null
    this.IK1303 = null
    this.IK1306 = null
    this.IR21 = null
    this.IR22 = null
    this.screenHandler(this.screen, this.dotScreen, true)
  }
}

function _tickExchange(dest, source) {
  dest.in = source.out
  dest.tick()
}

function _readFromMemory(chip, memoryAddress) {
  let chipPointer;

  switch (chip) {

    case 1: chipPointer = this.IR21.M; break;

    case 2: chipPointer = this.IR22.M; break;

    case 3: chipPointer = this.IK1302.M; break;

    case 4: chipPointer = this.IK1303.M; break;

    case 5: chipPointer = this.IK1306.M; break;

  }

  let exponent = chipPointer[memoryAddress-3] * 10 + chipPointer[memoryAddress-6];

  if (chipPointer[memoryAddress] === 9) {
    exponent = - (100 - exponent);
  }

  let i = 0;

  while (chipPointer[memoryAddress - 33 + i * 3] === 0) {
    if ((exponent === 7 - i) || (i === 7)) {
      break;
    }
    i++;
  }

  let digits = [];

  while (i < 8) {
    digits.push(chipPointer[memoryAddress - 33 + i * 3]);
    i++;
  }

  digits.reverse();

  let mantissa = (chipPointer[memoryAddress-9] === 9) ? '-' : '';

  let dot = false;

  for (let i = 0; i < digits.length; i++) {

    mantissa += screenSymbols[digits[i]];

    if ( ((i === 0) && ((exponent < 0) || (exponent > 7))) || (i === exponent) ) {

      mantissa += ',';
      dot = true;

    }

  }

  if (!dot) {
    mantissa += ',';
  }

  let result = mantissa;

  if ((exponent < 0) || (exponent > 7)) {

    for (i = 0; i < 12 - mantissa.length; i++)

      result += ' ';

    result += exponent;

  }

  return result;
}

function _hasDiff(arr1, arr2) {
  return arr1.some((value, index) => value !== arr2[index])
}

export default Motherboard