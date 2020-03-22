import { AsyncMap } from './async-map'

export const main = async () => {
  // const iterable = {
  //   *[Symbol.iterator]() {
  //     yield ['a', 1]
  //     yield ['b', 2]
  //   },
  // } as Iterable<[string, number]> // not `(string | number)[]`

  const asyncIterable = {
    async *[Symbol.asyncIterator]() {
      yield await Promise.resolve(['a', 1])
      yield await Promise.resolve(['b', 2])
    },
  } as AsyncIterable<[string, number]> // not `(string | number)[]`

  const asyncMap = AsyncMap<string, number>(asyncIterable)
    .set('b', 2)
    .set('c', 3)
    .deleteKey('a')
    .map(([key, value]) => Promise.resolve([`${key} async`, value + 100]))
    .reduce(async (acc, entry) => {
      await Promise.resolve()

      let result = acc.concat([entry])

      if (entry[0] === 'c async') {
        result = acc.concat([
          ['d async', 104],
          ['e async', 105],
        ])
      }

      return result
    }, [] as [string, number][])

  console.log(await asyncMap.size())

  for await (const entry of asyncMap.entries()) {
    console.log(entry)
  }
}
