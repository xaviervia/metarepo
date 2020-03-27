import React from 'react'
import TestRenderer, { act, ReactTestRenderer } from 'react-test-renderer'
import test from 'tape'
import { createSpy, getSpyCalls } from 'spyfn'
import { component, startWithType, onMount } from '../src'

test('onMount: sync function', (t) => {
  const onUnmountSpy = createSpy(() => null)
  const onMountSpy = createSpy(() => onUnmountSpy) as () => void
  const componentSpy = createSpy(() => null)
  const getNumRenders = () => getSpyCalls(componentSpy).length
  const MyComp = component(
    startWithType<{ foo: string }>(),
    onMount(onMountSpy)
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
    getSpyCalls(onMountSpy),
    [
      [{ foo: 'foo' }], // Mount
    ],
    'Mount: should call mount'
  )

  t.deepEquals(
    getSpyCalls(onUnmountSpy),
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
    getSpyCalls(onMountSpy),
    [
      [{ foo: 'foo' }], // Mount
    ],
    'Update: should not call mount anymore'
  )

  t.deepEquals(
    getSpyCalls(onUnmountSpy),
    [],
    'Update: should not call unmount'
  )

  /* Unmount */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer.unmount()
  })

  t.deepEquals(
    getSpyCalls(onMountSpy),
    [
      [{ foo: 'foo' }], // Mount
    ],
    'Unmount: should not call mount anymore'
  )

  t.deepEquals(
    getSpyCalls(onUnmountSpy),
    [],
    'Unmount: should not call unmount'
  )

  t.equals(
    getNumRenders(),
    2,
    'Render: should render component exact times'
  )

  t.end()
})

test('onMount: async function', (t) => {
  const onMountSpy = createSpy(async () => {})
  const componentSpy = createSpy(() => null)
  const getNumRenders = () => getSpyCalls(componentSpy).length
  const MyComp = component(
    startWithType<{ foo: string }>(),
    onMount(onMountSpy)
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
    getSpyCalls(onMountSpy),
    [
      [{ foo: 'foo' }], // Mount
    ],
    'Mount: should call mount'
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
    getSpyCalls(onMountSpy),
    [
      [{ foo: 'foo' }], // Mount
    ],
    'Update: should not call mount anymore'
  )

  /* Unmount */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer.unmount()
  })

  t.deepEquals(
    getSpyCalls(onMountSpy),
    [
      [{ foo: 'foo' }], // Mount
    ],
    'Unmount: should not call mount anymore'
  )

  t.equals(
    getNumRenders(),
    2,
    'Render: should render component exact times'
  )

  t.end()
})
