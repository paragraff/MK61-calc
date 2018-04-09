import {memoryPages, memoryPageOffsets, stackPages, stackPageOffests, returnPages, commandPointerAddress, screenSymbols} from './core_constants'
import {updateScreen} from '../Actions/updateScreen'

class Motherboard {
  constructor (factory, firmware1302, firmware1303, firmware1306) {
    // create chip instances
    this.IK1302 = factory.createIK13(firmware1302)
    this.IK1303 = factory.createIK13(firmware1303)
    this.IK1306 = factory.createIK13(firmware1306)
    this.IR21 = factory.createIR2()
    this.IR22 = factory.createIR2()

    this.screen = []
    this.dotScreen = []
    this.oldScreen = []
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
    this.IK1303.buttonPressed(1, this.angleUnits)

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
      this.updateScreen()
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

    let stack = []
    for (let i = 0; i < 5; i++) {
      stack[i] = privateReadMemory(stackPages[stackPageOffests[offset][i]][0], stackPages[stackPageOffests[offset][i]][1]);
    }

    let commandPointer = screenSymbols[this.IK1302.R[commandPointerAddress]] + screenSymbols[this.IK1302.R[commandPointerAddress - 3]];

    let stackReturns = []
    for (let i = 0; i < 5; i++) {
      stackReturns[i] = screenSymbols[this.IK1302.R[returnPages[i]]] + screenSymbols[this.IK1302.R[returnPages[i] - 3]];
    }

  }

  pressButton (x, y) {
    this.IK1302.codeX = x;
    this.IK1302.codeY = y;
    this.step()
  }

  changeAngleUnits (value) {
    this.angleUnits = value;
  }

  updateScreen () {
    // send action with screen values
    updateScreen(this.screen, this.dotScreen, true)

    // code below should blink the screen
    // if (режим_счёта != (ИК1302.запятая == 11)) {
    //
    //   Изменить_яркость(режим_счёта);
    //
    //   режим_счёта = !режим_счёта;
    //
    // }
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

export default Motherboard