export const asyncEntriesDeleteValue = <K, V>(value: V, entries: AsyncIterable<readonly [K, V]>): AsyncIterable<readonly [K, V]> =>
  ({
    async *[Symbol.asyncIterator]() {
      for await (const entry of entries) {
        if (entry[1] !== value) {
          yield entry
        }
      }
    },
  })
