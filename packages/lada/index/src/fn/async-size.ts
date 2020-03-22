export const asyncSize = async (iterable: AsyncIterable<any>): Promise<number> => {
  let i = 0

  const iterator = iterable[Symbol.asyncIterator]()
  let iteration = await iterator.next()

  while (iteration.done !== true) {
    iteration = await iterator.next()
    i++
  }

  return i
}
