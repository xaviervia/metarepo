export const asyncEntriesDelete = <K, V>(testEntry: readonly [K, V], entries: AsyncIterable<readonly [K, V]>): AsyncIterable<readonly [K, V]> =>
  ({
    async *[Symbol.asyncIterator]() {
      for await (const entry of entries) {
        if (entry[0] !== testEntry[0] && entry[1] !== testEntry[1]) {
          yield entry
        }
      }
    },
  })
