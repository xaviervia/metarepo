import { TMaybePromise } from '../utils/types'

export const asyncFilter = <T>(filter: (item: T, i: number) => TMaybePromise<boolean>, iterable: AsyncIterable<T>): AsyncIterable<T> =>
  ({
    async *[Symbol.asyncIterator]() {
      let i = 0

      for await (const item of iterable) {
        const shouldStay = await filter(item, i++)

        if (shouldStay) {
          yield item
        }
      }
    },
  })
