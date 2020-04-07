import test from 'tape'
import { composeAsync } from '../src/compose-async'

const add = (arg0: number) => (arg1: number): number => arg0 + arg1
const addAsync = (arg0: number) => (arg1: number): Promise<number> => Promise.resolve(arg0 + arg1)
const mult = (arg0: number) => (arg1: number): number => arg0 * arg1
const multAsync = (arg0: number) => (arg1: number): Promise<number> => Promise.resolve(arg0 * arg1)
const constant = <T> (arg: T) => () => arg
const toString = (arg: any): string => `${arg}`
const toNumber = (arg: string): number => Number(arg)
const throwing = (message: string) => (): never => {
  throw new Error(message)
}

test('should return async \'identity\' function', async (t) => {
  const piped = composeAsync<number>()
  const res = await piped(1)

  t.equals(res, 1)
})

test('should work with a discarding \'constant\' function', async (t) => {
  const piped = composeAsync(toString, constant(10), add(2))

  t.equals(await piped(2), '10')
})

test('should work with single sync function', async (t) => {
  const piped = composeAsync(add(2))
  const res = await piped(2)

  t.equals(res, 4)
})

test('should work with multiple sync functions', async (t) => {
  const piped = composeAsync(mult(10), add(2))
  const res = await piped(0)

  t.equals(res, 20)
})

test('should work with multiple async functions', async (t) => {
  const piped = composeAsync(multAsync(10), addAsync(2))
  const res = await piped(0)

  t.equals(res, 20)
})

test('should work with multiple sync functions with type conversion in between', async (t) => {
  const piped = composeAsync(toString, mult(10))
  const res = await piped(1)

  t.equals(res, '10')
})

test('should work with multiple functions with type conversion in between', async (t) => {
  const piped = composeAsync(toString, multAsync(10))
  const res = await piped(1)

  t.equals(res, '10')
})

test('should work with multiple sync functions with type conversion in between', async (t) => {
  const piped = composeAsync(multAsync(10), toNumber)
  const res = await piped('1')

  t.equals(res, 10)
})

test('should handle throwing function', async (t) => {
  const piped = composeAsync(throwing('error'))

  try {
    await piped({})
    t.fail('should not reach this point')
  } catch (e) {
    t.equals(e.message, 'error')
  }
})

test('should handle throwing function inside pipe', async (t) => {
  const piped = composeAsync(toString, throwing('error'), addAsync(2))

  try {
    await piped(42)
    t.fail('should not reach this point')
  } catch (e) {
    t.equals(e.message, 'error')
  }
})
