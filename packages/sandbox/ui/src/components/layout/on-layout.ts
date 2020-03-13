import { useRef, useLayoutEffect } from 'react'
import { EMPTY_OBJECT, NOOP } from 'tsfn'
import { shallowEqualByKeys } from 'refun'

export const onLayout = <P extends {}> (onLayoutHandler: (props: P) => void, watchKeys: (keyof P)[]) =>
  (props: P): P => {
    const shouldCallHandler = useRef(true)
    const propsRef = useRef<P>(EMPTY_OBJECT)
    const useEffectFnRef = useRef(NOOP)

    shouldCallHandler.current = propsRef.current === EMPTY_OBJECT || !shallowEqualByKeys(propsRef.current, props, watchKeys)
    propsRef.current = props

    if (useEffectFnRef.current === NOOP) {
      useEffectFnRef.current = () => {
        if (shouldCallHandler.current) {
          onLayoutHandler(propsRef.current)
        }
      }
    }

    useLayoutEffect(useEffectFnRef.current)

    return props
  }