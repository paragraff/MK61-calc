const angleUnits = {
  'DEG': 0,
  'RAD': 1,
  'GON': 2,
}

const power = {
  'ON': true,
  'OFF': false,
}

const mode = {
  'AUTO': undefined,
  'EXEC': true,
  'PROG': false,
}

const powerOnState = {
  screen: '+0.dsdsdsdsdsdsds+dsds',
  power: power.ON,
  angleUnitsSwither: angleUnits.DEG,
  stack: [0, 0, 0, 0],
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  program: [],
  mode: mode.AUTO,
  commandPointer: 0,
}

const powerOffState = {
  screen: '+dsdsdsdsdsdsdsds+dsds',
  power: power.OFF,
  angleUnitsSwither: angleUnits.DEG,
  stack: [],
  memory: [],
  program: [],
  mode: mode.AUTO,
  commandPointer: 0,
}


export {angleUnits, power, mode, powerOnState, powerOffState}