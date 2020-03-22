export const asyncEntriesSet = <K, V>(key: K, value: V, entries: AsyncIterable<readonly [K, V]>): AsyncIterable<readonly [K, V]> =>
  ({
    async *[Symbol.asyncIterator]() {
      let hasBeenInserted = false

      for await (const entry of entries) {
        if (entry[0] === key) {
          hasBeenInserted = true

          yield [key, value] as const
        } else {
          yield entry
        }
      }

      if (!hasBeenInserted) {
        yield [key, value] as const
      }
    },
  })
