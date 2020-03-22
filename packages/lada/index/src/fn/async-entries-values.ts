export const asyncEntriesValues = <K, V>(entries: AsyncIterable<readonly [K, V]>): AsyncIterable<V> =>
  ({
    async *[Symbol.asyncIterator]() {
      for await (const entry of entries) {
        yield entry[1]
      }
    },
  })
