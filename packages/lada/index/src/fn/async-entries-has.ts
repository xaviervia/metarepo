export const asyncEntriesHas = async <K, V>(testEntry: readonly [K, V], entries: AsyncIterable<readonly [K, V]>): Promise<boolean> => {
  for await (const entry of entries) {
    if (entry[0] === testEntry[0] && entry[1] === testEntry[1]) {
      return true
    }
  }

  return false
}
