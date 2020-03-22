export const asyncHas = async <T>(value: T, iterable: AsyncIterable<T>): Promise<boolean> => {
  for await (const item of iterable) {
    if (item === value) {
      return true
    }
  }

  return false
}
