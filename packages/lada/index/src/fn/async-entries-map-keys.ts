import { TMaybePromise } from '../utils/types'

export const asyncEntriesMapKeys = <K, V, KR>(mapper: (key: K, i: number) => TMaybePromise<KR>, entries: AsyncIterable<readonly [K, V]>): AsyncIterable<readonly [KR, V]> =>
  ({
    async *[Symbol.asyncIterator]() {
      let i = 0

      for await (const entry of entries) {
        const newKey = await mapper(entry[0], i++)

        yield [newKey, entry[1]] as const
      }
    },
  })
