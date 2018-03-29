import IK13 from './Chip_IK13'
import IR2 from './Chip_IR2'

class MicroFactory {
  constructor () {
  }
  createIR2 () {
    return new IR2()
  }
  createIK13 (firmware) {
    return new IK13(firmware)
  }
}

export default MicroFactory;