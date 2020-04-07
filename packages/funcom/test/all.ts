import test from 'tape'
import { all } from '../src/all'
import { pipe } from '../src/pipe'

const add = (arg0: number) => (arg1: number) => arg0 + arg1
const mult = (arg0: number) => (arg1: number) => arg0 * arg1
const constant = <T> (arg: T) => (): T => arg
const toString = (arg: number) => `${arg}`
const toNumber = (arg: string) => Number(arg)
const noop = () => {}

test('should return the void function', (t) => {
  const piped = all()
  const res = piped()

  t.deepEquals(res, [])

  t.end()
})

test('should work with the void function', (t) => {
  const piped = all(noop)
  const res = piped()

  t.deepEquals(res, [undefined])

  t.end()
})

test('should work with a constant function', (t) => {
  const piped = all(constant(10))
  const res = piped()

  t.deepEquals(res, [10])

  t.end()
})

test('should work with one function', (t) => {
  const piped = all(add(2))
  const res = piped(2)

  t.deepEquals(res, [4])

  t.end()
})

test('should work with multiple functions', (t) => {
  const piped = all(constant(10), add(2), toString)
  const res = piped(4)

  t.deepEquals(res, [10, 6, '4'])

  t.end()
})

test('should work with functions returning different type', (t) => {
  const piped = all(toNumber, pipe(toNumber, mult(10)))
  const res = piped('10')

  t.deepEquals(res, [10, 100])

  t.end()
})
