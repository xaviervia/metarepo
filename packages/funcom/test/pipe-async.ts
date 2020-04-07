import test from 'tape'
import { pipeAsync } from '../src/pipe-async'

const add = (arg0: number) => (arg1: number): number => arg0 + arg1
const addAsync = (arg0: number) => (arg1: number) => Promise.resolve(arg0 + arg1)
const mult = (arg0: number) => (arg1: number): number => arg0 * arg1
const multAsync = (arg0: number) => (arg1: number) => Promise.resolve(arg0 * arg1)
const constant = <T> (arg: T) => () => arg
const toString = (arg: number): string => `${arg}`
const toNumber = (arg: string): number => Number(arg)
const throwing = (message: string) => (): never => {
  throw new Error(message)
}

test('should return async \'identity\' function', async (t) => {
  const piped = pipeAsync<number>()
  const res = await piped(1)

  t.equals(res, 1)
})

test('should work with a discarding \'constant\' function', async (t) => {
  const piped = pipeAsync(add(2), constant(10), toString)

  t.equals(await piped(2), '10')
})

test('should work with single sync function', async (t) => {
  const piped = pipeAsync(add(2))
  const res = await piped(2)

  t.equals(res, 4)
})

test('should work with multiple sync functions', async (t) => {
  const piped = pipeAsync(add(2), mult(10))
  const res = await piped(0)

  t.equals(res, 20)
})

test('should work with multiple async functions', async (t) => {
  const piped = pipeAsync(addAsync(2), multAsync(10))
  const res = await piped(0)

  t.equals(res, 20)
})

test('should work with multiple sync functions with type conversion in between', async (t) => {
  const piped = pipeAsync(mult(10), toString)
  const res = await piped(1)

  t.equals(res, '10')
})

test('should work with multiple functions with type conversion in between', async (t) => {
  const piped = pipeAsync(multAsync(10), toString)
  const res = await piped(1)

  t.equals(res, '10')
})

test('should work with multiple sync functions with type conversion in between', async (t) => {
  const piped = pipeAsync(toNumber, multAsync(10))
  const res = await piped('1')

  t.equals(res, 10)
})

test('should handle throwing function', async (t) => {
  const piped = pipeAsync(throwing('error'))

  try {
    await piped({})
    t.fail('should not reach this point')
  } catch (e) {
    t.equals(e.message, 'error')
  }
})

test('should handle throwing function inside pipe', async (t) => {
  const piped = pipeAsync(addAsync(2), throwing('error'), toString)

  try {
    await piped(42)
    t.fail('should not reach this point')
  } catch (e) {
    t.equals(e.message, 'error')
  }
})
