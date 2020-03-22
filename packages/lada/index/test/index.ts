import test from 'blue-tape'
import { AsyncMap } from '../src'

test('lada: AsyncMap', async (t) => {
  t.true(
    typeof AsyncMap !== 'undefined',
    'should exist'
  )
})
