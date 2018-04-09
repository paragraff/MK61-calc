class IR2 {
  constructor () {
    this.M = [];

    for (let i = 0; i < 252; i++) {
      this.M[i] = 0;
    }

    this.in = 0
    this.out = 0;
    this.tickCount = 0;
  }
  tick () {

    this.out = this.M[this.tickCount];

    this.M[this.tickCount] = this.in;

    this.tickCount++;

    if (this.tickCount > 251) {
      this.tickCount = 0;
    }

  }
}

export default IR2;