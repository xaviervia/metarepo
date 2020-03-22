export const asyncEntriesKeys = <K, V>(entries: AsyncIterable<readonly [K, V]>): AsyncIterable<K> =>
  ({
    async *[Symbol.asyncIterator]() {
      for await (const entry of entries) {
        yield entry[0]
      }
    },
  })
