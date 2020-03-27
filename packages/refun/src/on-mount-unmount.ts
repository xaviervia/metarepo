import { useRef, useEffect } from 'react'
import { EMPTY_ARRAY, EMPTY_OBJECT, NOOP } from 'tsfn'

export const onMountUnmount = <P extends {}> (onMountUnmountFn: (props: P) => () => void) => (props: P): P => {
  const propsRef = useRef<P>(EMPTY_OBJECT)
  const onMountUnmountRef = useRef<() => void>(NOOP)

  if (onMountUnmountRef.current === NOOP) {
    onMountUnmountRef.current = () => onMountUnmountFn(propsRef.current)
  }

  propsRef.current = props

  useEffect(onMountUnmountRef.current, EMPTY_ARRAY)

  return props
}
