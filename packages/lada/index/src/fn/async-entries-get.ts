export const asyncEntriesGet = async <K, V>(key: K, entries: AsyncIterable<readonly [K, V]>): Promise<V | undefined> => {
  for await (const entry of entries) {
    if (entry[0] === key) {
      return entry[1]
    }
  }
}
