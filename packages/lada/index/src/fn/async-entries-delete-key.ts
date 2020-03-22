export const asyncEntriesDeleteKey = <K, V>(key: K, entries: AsyncIterable<readonly [K, V]>): AsyncIterable<readonly [K, V]> =>
  ({
    async *[Symbol.asyncIterator]() {
      for await (const entry of entries) {
        if (entry[0] !== key) {
          yield entry
        }
      }
    },
  })
