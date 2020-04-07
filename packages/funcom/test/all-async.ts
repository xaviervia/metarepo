import test from 'tape'
import { allAsync } from '../src/all-async'
import { pipe } from '../src/pipe'

const add = (arg0: number) => (arg1: number): number => arg0 + arg1
const addAsync = (arg0: number) => (arg1: number): Promise<number> => Promise.resolve(arg0 + arg1)
const multAsync = (arg0: number) => (arg1: number): Promise<number> => Promise.resolve(arg0 * arg1)
const constant = <T> (arg: T) => () => arg
const toString = (arg: number): string => `${arg}`
const toNumber = (arg: string): number => Number(arg)
const noop = () => {}

test('should return the void function', async (t) => {
  const piped = allAsync()
  const res = await piped()

  t.deepEquals(res, [])
})

test('should work with the void function', async (t) => {
  const piped = allAsync(noop)
  const res = await piped()

  t.deepEquals(res, [undefined])
})

test('should work with a constant function', async (t) => {
  const piped = allAsync(constant(10))
  const res = await piped()

  t.deepEquals(res, [10])
})

test('should work with one function', async (t) => {
  const piped = allAsync(add(2))
  const res = await piped(2)

  t.deepEquals(res, [4])
})

test('should work with multiple functions', async (t) => {
  const piped = allAsync(constant(10), addAsync(2), toString)
  const res = await piped(4)

  t.deepEquals(res, [10, 6, '4'])
})

test('should work with functions returning different type', async (t) => {
  const piped = allAsync(toNumber, pipe(toNumber, multAsync(10)))
  const res = await piped('10')

  t.deepEquals(res, [10, 100])
})
