export const asyncEntriesToNativeMap = async <K, V>(entries: AsyncIterable<readonly [K, V]>): Promise<Map<K, V>> => {
  const map = new Map<K, V>()

  for await (const entry of entries) {
    map.set(entry[0], entry[1])
  }

  return map
}
