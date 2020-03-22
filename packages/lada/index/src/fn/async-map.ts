import { TMaybePromise } from '../utils/types'

export const asyncMap = <T, R>(mapper: (value: T, i: number) => TMaybePromise<R>, iterable: AsyncIterable<T>): AsyncIterable<R> =>
  ({
    async *[Symbol.asyncIterator]() {
      let i = 0

      for await (const item of iterable) {
        yield mapper(item, i++)
      }
    },
  })
