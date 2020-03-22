import { TMaybePromise } from '../utils/types'

export const asyncEntriesFilterValues = <K, V>(filter: (value: V, i: number) => TMaybePromise<boolean>, entries: AsyncIterable<readonly [K, V]>): AsyncIterable<readonly [K, V]> =>
  ({
    async *[Symbol.asyncIterator]() {
      let i = 0

      for await (const entry of entries) {
        const shouldStay = await filter(entry[1], i++)

        if (shouldStay) {
          yield entry
        }
      }
    },
  })
