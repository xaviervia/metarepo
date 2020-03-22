export const asyncEntriesHasKey = async <K, V>(key: K, entries: AsyncIterable<readonly [K, V]>): Promise<boolean> => {
  for await (const entry of entries) {
    if (entry[0] === key) {
      return true
    }
  }

  return false
}
