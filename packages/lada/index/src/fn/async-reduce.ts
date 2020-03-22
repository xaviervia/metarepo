import { TMaybePromise } from '../utils/types'

export const asyncReduce = <T, R>(reducer: (acc: R[], entry: T, i: number) => TMaybePromise<R[]>, initial: R[], entries: AsyncIterable<T>): AsyncIterable<R> =>
  ({
    async *[Symbol.asyncIterator]() {
      let i = 0
      let newEntries = initial

      for await (const entry of entries) {
        newEntries = await reducer(newEntries, entry, i++)
      }

      for (const newEntry of newEntries) {
        yield newEntry
      }
    },
  })
