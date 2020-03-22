import { TMaybePromise } from '../utils/types'

export const asyncEntriesMapValues = <K, V, VR>(mapper: (value: V, i: number) => TMaybePromise<VR>, entries: AsyncIterable<readonly [K, V]>): AsyncIterable<readonly [K, VR]> =>
  ({
    async *[Symbol.asyncIterator]() {
      let i = 0

      for await (const entry of entries) {
        const newValue = await mapper(entry[1], i++)

        yield [entry[0], newValue] as const // not `(KR | V)[]`
      }
    },
  })
