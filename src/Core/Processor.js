import MicroFactory from './MicroFactory'
import {firmware1302, firmware1303, firmware1306} from './firmwares'

const factory = new MicroFactory()
const processor = Processor.createInstance(factory, firmware1302, firmware1303, firmware1306)

class Processor {
  constructor (factory, firmware1302, firmware1303, firmware1306) {
    this.IK1302 = factory.createIK13(firmware1302)
    this.IK1303 = factory.createIK13(firmware1303)
    this.IK1306 = factory.createIK13(firmware1306)
    this.IR21 = factory.createIR2()
    this.IR22 = factory.createIR2()
  }
  static createInstance (factory, firmware1302, firmware1303, firmware1306) {
    return new Processor(factory, firmware1302, firmware1303, firmware1306)
  }
}