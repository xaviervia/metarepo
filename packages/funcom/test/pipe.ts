import test from 'tape'
import { pipe } from '../src/pipe'

const add = (arg0: number) => (arg1: number): number => arg0 + arg1
const mult = (arg0: number) => (arg1: number): number => arg0 * arg1
const constant = <T> (arg: T) => () => arg
const toString = (arg: number): string => `${arg}`
const toNumber = (arg: string): number => Number(arg)

test('should return the identity function', (t) => {
  const piped = pipe<number>()
  const res = piped(1)

  t.equals(res, 1)

  t.end()
})

test('should work with a discarding constant function', (t) => {
  const piped = pipe(add(2), constant(10), toString)
  const res = piped(2)

  t.equals(res, '10')

  t.end()
})

test('should work with one function', (t) => {
  const piped = pipe(add(2))

  t.equals(piped(2), 4)

  t.end()
})

test('should work with two functions', (t) => {
  const piped = pipe(add(2), mult(10))

  t.equals(piped(0), 20)

  t.end()
})

test('should work with functions returning different type', (t) => {
  const piped = pipe(mult(10), toString)

  t.equals(piped(1), '10')

  t.end()
})

test('should work with functions returning different type', (t) => {
  const piped = pipe(toNumber, mult(10))

  t.equals(piped('10'), 100)

  t.end()
})
