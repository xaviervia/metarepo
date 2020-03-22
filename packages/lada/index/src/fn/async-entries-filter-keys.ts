import { TMaybePromise } from '../utils/types'

export const asyncEntriesFilterKeys = <K, V>(filter: (key: K, i: number) => TMaybePromise<boolean>, entries: AsyncIterable<readonly [K, V]>): AsyncIterable<readonly [K, V]> =>
  ({
    async *[Symbol.asyncIterator]() {
      let i = 0

      for await (const entry of entries) {
        const shouldStay = await filter(entry[0], i++)

        if (shouldStay) {
          yield entry
        }
      }
    },
  })
