import React from 'react'
import TestRenderer, { act, ReactTestRenderer } from 'react-test-renderer'
import test from 'tape'
import { createSpy, getSpyCalls } from 'spyfn'
import { component, startWithType, onUpdate } from '../src'

test('onUpdate: sync function, empty watch keys', (t) => {
  const onUpdateSpy = createSpy(() => {})
  const componentSpy = createSpy(() => null)
  const getNumRenders = () => getSpyCalls(componentSpy).length
  const MyComp = component(
    startWithType<{ foo: string }>(),
    onUpdate(onUpdateSpy, [])
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
    getSpyCalls(onUpdateSpy),
    [],
    'Mount: should not call update'
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
    getSpyCalls(onUpdateSpy),
    [
      [{ foo: 'bar' }], // Update
    ],
    'Update: should not call update if array was empty'
  )

  /* Unmount */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer.unmount()
  })

  t.deepEquals(
    getSpyCalls(onUpdateSpy),
    [
      [{ foo: 'bar' }], // Update
    ],
    'Unmount: should not call update'
  )

  t.equals(
    getNumRenders(),
    2,
    'Render: should render component exact times'
  )

  t.end()
})

test('onUpdate: sync function, watch keys', (t) => {
  const onUpdateSpy = createSpy(() => {})
  const componentSpy = createSpy(() => null)
  const getNumRenders = () => getSpyCalls(componentSpy).length
  const MyComp = component(
    startWithType<{ foo: string, bar: string }>(),
    onUpdate(onUpdateSpy, ['foo'])
  )(componentSpy)

  let testRenderer: ReactTestRenderer

  /* Mount */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer = TestRenderer.create(
      <MyComp
        foo="foo"
        bar="bar"
      />
    )
  })

  t.deepEquals(
    getSpyCalls(componentSpy),
    [
      [{ foo: 'foo', bar: 'bar' }], // Mount
    ],
    'Mount: should pass props'
  )

  t.deepEquals(
    getSpyCalls(onUpdateSpy),
    [],
    'Mount: should not call update'
  )

  /* Update not watched prop */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer.update(
      <MyComp
        foo="foo"
        bar="baz"
      />
    )
  })

  t.deepEquals(
    getSpyCalls(componentSpy),
    [
      [{ foo: 'foo', bar: 'bar' }], // Mount
      [{ foo: 'foo', bar: 'baz' }], // Update not watched prop
    ],
    'Update not watched prop: should pass props'
  )

  t.deepEquals(
    getSpyCalls(onUpdateSpy),
    [],
    'Update not watched prop: should not call update if changed props were not watched'
  )

  /* Update watched prop */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer.update(
      <MyComp
        foo="bar"
        bar="baz"
      />
    )
  })

  t.deepEquals(
    getSpyCalls(componentSpy),
    [
      [{ foo: 'foo', bar: 'bar' }], // Mount
      [{ foo: 'foo', bar: 'baz' }], // Update not watched prop
      [{ foo: 'bar', bar: 'baz' }], // Update watched prop
    ],
    'Update watched prop: should pass props'
  )

  t.deepEquals(
    getSpyCalls(onUpdateSpy),
    [
      [{ foo: 'bar', bar: 'baz' }], // Update watched prop
    ],
    'Update watched prop: should call update if changed props were watched'
  )

  /* Unmount */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer.unmount()
  })

  t.deepEquals(
    getSpyCalls(onUpdateSpy),
    [
      [{ foo: 'bar', bar: 'baz' }], // Update watched prop
    ],
    'Unmount: should not call update'
  )

  t.equals(
    getNumRenders(),
    3,
    'Render: should render component exact times'
  )

  t.end()
})

test('onUpdate: async function, empty watch keys', (t) => {
  const onUpdateSpy = createSpy(async () => {})
  const componentSpy = createSpy(() => null)
  const getNumRenders = () => getSpyCalls(componentSpy).length
  const MyComp = component(
    startWithType<{ foo: string }>(),
    onUpdate(onUpdateSpy, [])
  )(componentSpy)

  let testRenderer: ReactTestRenderer

  /* Mount */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer = TestRenderer.create(
      <MyComp
        foo="foo"
      />
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
    getSpyCalls(onUpdateSpy),
    [],
    'Mount: should not call update'
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
    getSpyCalls(onUpdateSpy),
    [
      [{ foo: 'bar' }], // Update
    ],
    'Update: should call update if array was empty'
  )

  /* Unmount */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer.unmount()
  })

  t.deepEquals(
    getSpyCalls(onUpdateSpy),
    [
      [{ foo: 'bar' }], // Update
    ],
    'Unmount: should not call update'
  )

  t.equals(
    getNumRenders(),
    2,
    'Render: should render component exact times'
  )

  t.end()
})

test('onUpdate: async function, watch keys', (t) => {
  const onUpdateSpy = createSpy(async () => {})
  const componentSpy = createSpy(() => null)
  const getNumRenders = () => getSpyCalls(componentSpy).length
  const MyComp = component(
    startWithType<{ foo: string, bar: string }>(),
    onUpdate(onUpdateSpy, ['foo'])
  )(componentSpy)

  let testRenderer: ReactTestRenderer

  /* Mount */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer = TestRenderer.create(
      <MyComp
        foo="foo"
        bar="bar"
      />
    )
  })

  t.deepEquals(
    getSpyCalls(componentSpy),
    [
      [{ foo: 'foo', bar: 'bar' }], // Mount
    ],
    'Mount: should pass props'
  )

  t.deepEquals(
    getSpyCalls(onUpdateSpy),
    [],
    'Mount: should not call update'
  )

  /* Update not watched prop */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer.update(
      <MyComp foo="foo" bar="baz"/>
    )
  })

  t.deepEquals(
    getSpyCalls(componentSpy),
    [
      [{ foo: 'foo', bar: 'bar' }], // Mount
      [{ foo: 'foo', bar: 'baz' }], // Update not watched prop
    ],
    'Update not watched prop: should pass props'
  )

  t.deepEquals(
    getSpyCalls(onUpdateSpy),
    [],
    'Update not watched prop: should not call update if changed props were not watched'
  )

  /* Update watched prop */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer.update(
      <MyComp foo="bar" bar="baz"/>
    )
  })

  t.deepEquals(
    getSpyCalls(componentSpy),
    [
      [{ foo: 'foo', bar: 'bar' }], // Mount
      [{ foo: 'foo', bar: 'baz' }], // Update not watched prop
      [{ foo: 'bar', bar: 'baz' }], // Update watched prop
    ],
    'Update watched prop: should pass props'
  )

  t.deepEquals(
    getSpyCalls(onUpdateSpy),
    [
      [{ foo: 'bar', bar: 'baz' }], // Update watched prop
    ],
    'Update watched prop: should call update if changed props were watched'
  )

  /* Unmount */
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  act(() => {
    testRenderer.unmount()
  })

  t.deepEquals(
    getSpyCalls(onUpdateSpy),
    [
      [{ foo: 'bar', bar: 'baz' }], // Update watched prop
    ],
    'Unmount: should not call update'
  )

  t.equals(
    getNumRenders(),
    3,
    'Render: should render component exact times'
  )

  t.end()
})
