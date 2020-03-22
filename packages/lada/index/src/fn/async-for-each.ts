import { TMaybePromise } from '../utils/types'

export const asyncForEach = async <T>(callback: (item: T, i: number) => TMaybePromise<void>, iterable: AsyncIterable<T>): Promise<void> => {
  let i = 0

  for await (const item of iterable) {
    await callback(item, i++)
  }
}
