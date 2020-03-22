export const asyncEntriesHasValue = async <K, V>(value: V, entries: AsyncIterable<readonly [K, V]>): Promise<boolean> => {
  for await (const entry of entries) {
    if (entry[1] === value) {
      return true
    }
  }

  return false
}
