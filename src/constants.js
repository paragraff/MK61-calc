const angleUnits = {
  'DEG': 11,
  'RAD': 10,
  'GON': 12,
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
  lastButton: undefined,
  screen: '+0.dsdsdsdsdsdsds+dsds',
  power: power.ON,
  angleUnitsSwither: angleUnits.RAD,
  stack: [0, 0, 0, 0],
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  program: [],
  returnStack: [],
  commandPointer: 0,
}

const powerOffState = {
  lastButton: undefined,
  screen: '+dsdsdsdsdsdsdsds+dsds',
  power: power.OFF,
  angleUnitsSwither: angleUnits.RAD,
  stack: [],
  memory: [],
  program: [],
  returnStack: [],
  commandPointer: 0,
}


export {angleUnits, power, mode, powerOnState, powerOffState}