const SIZE_OF_WORDS = 4
const SIZE_OF_DWORDS = 8

class HexTable {
  /**  @param {Buffer} buffer */
  constructor(buffer) {
    this.hex = buffer.toString('hex')
  }

  /** @param {string} index */
  goTo(index) {
    this.index = parseInt(index, 16) * 2
    return this
  }

  /** @param {number} amount  */
  offset(amount) {
    this.index += amount
  }

  readWord(offset = false) {
    return this.read(SIZE_OF_WORDS, offset)
  }

  readDWord(offset = false) {
    return this.read(SIZE_OF_DWORDS, offset)
  }

  read(amount, offset = false) {
    const index = this.index
    const word = this.hex.slice(index, index + amount)

    if (offset) {
      this.offset(amount)
    }

    return word
  }
}

module.exports = HexTable
