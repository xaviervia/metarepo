import test from 'tape'
import { compose } from '../src'

const add = (arg0: number) => (arg1: number): number => arg0 + arg1
const mult = (arg0: number) => (arg1: number): number => arg0 * arg1
const constant = <T> (arg: T) => () => arg
const toString = (arg: number): string => `${arg}`
const toNumber = (arg: string): number => Number(arg)

test('should return the identity function', (t) => {
  const piped = compose<number>()

  t.equals(piped(1), 1)

  t.end()
})

test('should work with a discarding constant function', (t) => {
  const piped = compose(toString, constant(10), add(2))

  t.equals(piped(2), '10')

  t.end()
})

test('should work with one function', (t) => {
  const piped = compose(add(2))

  t.equals(piped(2), 4)

  t.end()
})

test('should work with two functions', (t) => {
  const piped = compose(mult(10), add(2))

  t.equals(piped(0), 20)

  t.end()
})

test('should work with functions returning different type', (t) => {
  const piped = compose(toString, mult(10))

  t.equals(piped(1), '10')

  t.end()
})

test('should work with functions returning different type', (t) => {
  const piped = compose(mult(10), toNumber)

  t.equals(piped('10'), 100)

  t.end()
})
