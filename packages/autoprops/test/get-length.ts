import test from 'tape'
import I from 'big-integer'
import { TCommonComponentConfig } from '../src/types'
import { getLength } from '../src/get-length'

test('autoprops: getLength', (t) => {
  const config: TCommonComponentConfig = {
    props: {
      a: [true],
      b: [true],
    },
    children: {
      child1: {
        config: {
          props: {},
        },
        Component: () => null,
      },
      child2: {
        config: {
          props: {},
          children: {
            child: {
              config: {
                props: {
                  a: [true],
                },
              },
              Component: () => null,
            },
          },
        },
        Component: () => null,
      },
    },
    required: ['a', 'child1'],
  }

  t.true(
    getLength(config).equals(I(8)),
    'should return proper length'
  )

  t.end()
})
