import React from 'react'
import TestRenderer, { act, ReactTestRenderer } from 'react-test-renderer'
import test from 'tape'
import { createSpy, getSpyCalls } from 'spyfn'
import { component, startWithType, onMountUnmount } from '../src'

test('onMountUnmount', (t) => {
  const unmountSpy = createSpy(() => null)
  const mountSpy = createSpy(() => unmountSpy)
  const componentSpy = createSpy(() => null)
  const getNumRenders = () => getSpyCalls(componentSpy).length
  const MyComp = component(
    startWithType<{ foo: string }>(),
    onMountUnmount(mountSpy)
  )(componentSpy)

  let testRenderer: ReactTestRenderer

  /* Mount */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer = TestRenderer.create(
      <MyComp foo="foo"/>
    )
  })

  t.deepEquals(
    getSpyCalls(componentSpy),
    [
      [{ foo: 'foo' }], // Mount
    ],
    'Mount: should pass props'
  )

  t.deepEquals(
    getSpyCalls(mountSpy),
    [
      [{ foo: 'foo' }], // Mount
    ],
    'Mount: should call mount'
  )

  t.deepEquals(
    getSpyCalls(unmountSpy),
    [],
    'Mount: should not call unmount'
  )

  /* Update */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer.update(
      <MyComp foo="bar"/>
    )
  })

  t.deepEquals(
    getSpyCalls(componentSpy),
    [
      [{ foo: 'foo' }], // Mount
      [{ foo: 'bar' }], // Update
    ],
    'Update: should pass props'
  )

  t.deepEquals(
    getSpyCalls(mountSpy),
    [
      [{ foo: 'foo' }], // Mount
    ],
    'Update: should not call mount anymore'
  )

  t.deepEquals(
    getSpyCalls(unmountSpy),
    [],
    'Update: should not call unmount'
  )

  /* Unmount */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer.unmount()
  })

  t.deepEquals(
    getSpyCalls(mountSpy),
    [
      [{ foo: 'foo' }], // Mount
    ],
    'Unmount: should not call mount anymore'
  )

  t.deepEquals(
    getSpyCalls(unmountSpy),
    [
      [],
    ],
    'Unmount: should call unmount'
  )

  t.equals(
    getNumRenders(),
    2,
    'Render: should render component exact times'
  )

  t.end()
})

