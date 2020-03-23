import test from 'blue-tape'
import { iva } from '../src'

test('iva: iva', async (t) => {
  const result = await iva()

  t.equal(
    result,
    123,
    'should work'
  )
})
