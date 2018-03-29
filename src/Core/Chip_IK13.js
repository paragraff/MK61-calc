class IK13 {
  constructor (firmware) {
    this.memoryOfMicrocommands = [].concat(firmware.microCommands)
    this.memoryOfSyncProgramms = [].concat(firmware.syncPrograms)
    this.memoryOfCommands = [].concat(firmware.commands)

    this.M = []
    this.R = []
    this.ST = []

    for (let i = 0; i < 42; i++) {
      this.M[i] = 0
      this.R[i] = 0
      this.ST[i] = 0
    }

    this.S = 0
    this.S1 = 0

    this.L = 0
    this.T = 0
    this.P = 0;

    this.AMK = 0
    this.ASP = 0
    this.AK = 0
    this.MOD = 0

    this.tickCount = 0
    this.microCommand = 0;

    this.in = 0
    this.out = 0;

    this.codeX = 0
    this.codeY = 0
    this.dot = 0

    this.clearScreen = false;

    this.dots = [];
    for (let i = 0; i < 14; i++) {
      this.dots = false;
    }

  }

  // i have no idea what doing this code
  tick () {

    if (this.tickCount === 0) {
      this.AK = this.R[36] + 16 * this.R[39];

      if ((this.memoryOfCommands[this.AK] & 0xfc0000) === 0) {
        this.T = 0;
      }
    }

    const tick9 = this.tickCount / 9 | 0;

    if (tick9 < 3) {
      this.ASP = this.memoryOfCommands[this.AK] & 0xff;
    } else if (tick9 === 3) {
      this.ASP = this.memoryOfCommands[this.AK] >>> 8 & 0xff;
    } else if (tick9 === 4) {

      this.ASP = this.memoryOfCommands[this.AK] >>> 16 & 0xff;

      if (this.ASP > 0x1f) {

        if (this.tickCount === 36) {

          this.R[37] = this.ASP & 0xf;

          this.R[40] = this.ASP >>> 4;

        }

        this.ASP = 0x5f;

      }
    }

    this.MOD = this.memoryOfCommands[this.AK] >>> 24 & 0xff;

    this.AMK = this.memoryOfSyncProgramms[this.ASP * 9 + J[this.tickCount]];

    this.AMK = this.AMK & 0x3f;

    if (this.AMK > 59) {

      this.AMK = (this.AMK - 60) * 2;

      if (this.L === 0) {
        this.AMK++;
      }

      this.AMK += 60;

    }

    this.microCommand = this.memoryOfMicrocommands[this.AMK];

    const tick3 = this.tickCount / 3 | 0;

    let alfa = 0, beta = 0, gamma = 0;

    if ((this.microCommand >>> 25 & 1) > 0) {
      if (tick3 !== this.codeX - 1) {
        this.S1 |= this.codeY;
      }
    }

    if ((this.microCommand & 1) > 0) alfa |= this.R[this.tickCount];

    if ((this.microCommand & 2) > 0) alfa |= this.M[this.tickCount];

    if ((this.microCommand & 4) > 0) alfa |= this.ST[this.tickCount];

    if ((this.microCommand & 8) > 0) alfa |= ~this.R[this.tickCount] & 0xf;

    if ((this.microCommand & 16) > 0)

      if (this.L === 0) alfa |= 0xa;

    if ((this.microCommand & 32) > 0) alfa |= this.S;

    if ((this.microCommand & 64) > 0) alfa |= 4;

    if ((this.microCommand >>> 7 & 1) > 0) beta |= this.S;

    if ((this.microCommand >>> 7 & 2) > 0) beta |= ~this.S & 0xf;

    if ((this.microCommand >>> 7 & 4) > 0) beta |= this.S1;

    if ((this.microCommand >>> 7 & 8) > 0) beta |= 6;

    if ((this.microCommand >>> 7 & 16) > 0) beta |= 1;

    if ((this.memoryOfCommands[this.AK] & 0xfc0000) > 0) {

      if (this.codeY === 0) this.T = 0;

    } else {

      if (tick3 === this.codeX - 1)

        if (this.codeY > 0) {

          this.S1 = this.codeY;

          this.T = 1;

        }

      if (tick3 < 12)

        if (this.L > 0) this.dot = tick3;

      this.dots[tick3] = this.L > 0;

      this.clearScreen = true;

    }

    if ((this.microCommand >>> 12 & 1) > 0) gamma |= this.L & 1;

    if ((this.microCommand >>> 12 & 2) > 0) gamma |= ~this.L & 1;

    if ((this.microCommand >>> 12 & 4) > 0) gamma |= ~this.T & 1;

    const sum = alfa + beta + gamma;

    var sigma = sum & 0xf;

    this.P = sum >>> 4 & 1;

    if (this.MOD === 0 || this.tickCount >= 36) {

      switch (this.microCommand >>> 15 & 7) {

        case 1: this.R[this.tickCount] = this.R[(this.tickCount + 3) % 42]; break;

        case 2: this.R[this.tickCount] = sigma; break;

        case 3: this.R[this.tickCount] = this.S; break;

        case 4: this.R[this.tickCount] = this.R[this.tickCount] | this.S | sigma; break;

        case 5: this.R[this.tickCount] = this.S | sigma; break;

        case 6: this.R[this.tickCount] = this.R[this.tickCount] | this.S; break;

        case 7: this.R[this.tickCount] = this.R[this.tickCount] | sigma; break;

      }

      if ((this.microCommand >>> 18 & 1) > 0) this.R[(this.tickCount + 41) % 42] = sigma;

      if ((this.microCommand >>> 19 & 1) > 0) this.R[(this.tickCount + 40) % 42] = sigma;

    }

    if ((this.microCommand >>> 20 & 1) > 0) this.M[this.tickCount] = this.S;

    if ((this.microCommand >>> 21 & 1) > 0) this.L = this.P;


    switch (this.microCommand >>> 22 & 3) {

      case 1: this.S = this.S1; break;

      case 2: this.S = sigma; break;

      case 3: this.S = this.S1 | sigma; break;

    }


    switch (this.microCommand >>> 24 & 3) {

      case 1: this.S1 = sigma; break;

      case 2: this.S1 = this.S1; break;

      case 3: this.S1 = this.S1 | sigma; break;

    }

    let x, y, z;

    switch (this.microCommand >>> 26 & 3) {

      case 1:	this.ST[(this.tickCount + 2) % 42] = this.ST[(this.tickCount + 1) % 42];

        this.ST[(this.tickCount + 1) % 42] = this.ST[this.tickCount];

        this.ST[this.tickCount] = sigma;

        break;

      case 2:	x = this.ST[this.tickCount];

        this.ST[this.tickCount] = this.ST[(this.tickCount + 1) % 42];

        this.ST[(this.tickCount + 1) % 42] = this.ST[(this.tickCount + 2) % 42];

        this.ST[(this.tickCount + 2) % 42] = x;

        break;

      case 3:	x = this.ST[this.tickCount];

        y = this.ST[(this.tickCount + 1) % 42];

        z = this.ST[(this.tickCount + 2) % 42];

        this.ST[this.tickCount] = sigma | y;

        this.ST[(this.tickCount + 1) % 42] = x | z;

        this.ST[(this.tickCount + 2) % 42] = y | x;

        break;

    }


    this.out = this.M[this.tickCount];

    this.M[this.tickCount] = this.in;

    this.tickCount++;

    if (this.tickCount > 41) {
      this.tickCount = 0;
    }
  }
}
export default IK13