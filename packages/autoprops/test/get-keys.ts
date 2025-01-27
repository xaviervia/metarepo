import test from 'tape'
import { getPropKeys, getChildrenKeys } from '../src/get-keys'
import { TCommonComponentConfig } from '../src/types'

test('getPropKeys', (t) => {
  const props = {
    hasValue: true,
    c: true,
    onPress: true,
    children: true,
    isOk: true,
    a: true,
    onCover: true,
    shouldGo: true,
  }

  t.deepEquals(
    getPropKeys(props),
    [
      'a',
      'c',
      'children',
      'hasValue',
      'isOk',
      'shouldGo',
      'onCover',
      'onPress',
    ],
    'should sort props'
  )

  t.end()
})

test('getChildrenKeys: no children', (t) => {
  const config: TCommonComponentConfig = {
    props: {},
  }

  t.deepEquals(
    getChildrenKeys(config),
    [],
    'should return empty array'
  )

  t.end()
})

test('getChildrenKeys: sorted children', (t) => {
  const config: TCommonComponentConfig = {
    props: {},
    children: {
      text: {
        config: { props: {} },
        Component: () => null,
      },
      loader: {
        config: { props: {} },
        Component: () => null,
      },
      tooltip: {
        config: { props: {} },
        Component: () => null,
      },
    },
  }

  t.deepEquals(
    getChildrenKeys(config),
    [
      'text',
      'loader',
      'tooltip',
    ],
    'should sort children'
  )

  t.end()
})
