import BigInt, { BigInteger } from 'big-integer'

export const getNumSkipMutex = (values: readonly BigInteger[], length: readonly BigInteger[], changedIndex: number): BigInteger => {
  let numSkip = BigInt.one

  for (let i = 0; i <= changedIndex; ++i) {
    numSkip = numSkip.multiply(length[i].minus(values[i]))
  }

  return numSkip
}
