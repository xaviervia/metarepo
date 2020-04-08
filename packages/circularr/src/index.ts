export default class Circularr <T> {
  data: T[]
  index: number

  static from<T>(source: T[]): Circularr<T> {
    const arr = new Circularr<T>(source.length)

    for (let i = 0; i < source.length; i++) {
      arr.data[i] = source[i]
    }

    return arr
  }

  constructor(length: number) {
    this.data = new Array<T>(length)
    this.index = 0
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.data.length; i++) {
      yield this.data[(i + this.index) % this.data.length]
    }
  }

  get length(): number {
    return this.data.length
  }

  fill(value: T): this {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i] = value
    }

    this.index = 0

    return this
  }

  clear(): this {
    this.data = new Array<T>(this.data.length)
    this.index = 0

    return this
  }

  shift(value: T): T {
    const returnValue = this.data[this.index]

    this.data[this.index] = value
    this.index = (this.index + 1) % this.data.length

    return returnValue
  }

  unshift(value: T): T {
    this.index = (this.index + this.data.length - 1) % this.data.length

    const returnValue = this.data[this.index]

    this.data[this.index] = value

    return returnValue
  }

  slice(startIndex?: number, endIndex?: number): Circularr<T> {
    return Circularr.from(Array.from(this).slice(startIndex, endIndex))
  }

  trim(): Circularr<T> {
    const data = Array.from(this)
    let startIndex = 0
    let endIndex = data.length

    for (let i = 0; i < data.length; i++) {
      if (typeof data[i] !== 'undefined') {
        break
      }

      startIndex++
    }

    for (let i = data.length - 1; i >= 0; --i) {
      if (typeof data[i] !== 'undefined') {
        break
      }

      endIndex--
    }

    return Circularr.from(data.slice(startIndex, endIndex))
  }

  at(index: number): T | undefined {
    if (index < 0 || index >= this.data.length) {
      return
    }

    return this.data[(index + this.index) % this.data.length]
  }

  wrapAt(index: number): T | undefined {
    return this.data[(index + this.index) % this.data.length]
  }
}
