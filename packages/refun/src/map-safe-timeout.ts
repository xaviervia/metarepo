import { useRef, useEffect } from 'react'
import { TExtend, UNDEFINED, EMPTY_OBJECT, EMPTY_ARRAY, NOOP } from 'tsfn'

export type TSetSafeTimeout = (cb: () => void, delay: number) => () => void

export const mapSafeTimeoutFactory = (setTimeoutFn: Function, clearTimeoutFn: Function) =>
  <K extends string>(propName: K) => <P extends {}>(props: P): TExtend<P, { [k in K]: TSetSafeTimeout }> => {
    const timerIdsRef = useRef<Set<any>>(EMPTY_OBJECT)
    const setSafeTimeoutRef = useRef<TSetSafeTimeout>()
    const useEffectFnRef = useRef<() => () => void>()

    if (setSafeTimeoutRef.current === UNDEFINED) {
      timerIdsRef.current = new Set()

      setSafeTimeoutRef.current = (cb, delay) => {
        // check if component has been unmounted
        if (timerIdsRef.current === EMPTY_OBJECT) {
          return NOOP
        }

        const timerId = setTimeoutFn(() => {
          timerIdsRef.current.delete(timerId)
          cb()
        }, delay)

        timerIdsRef.current.add(timerId)

        return () => {
          clearTimeoutFn(timerId)
          timerIdsRef.current.delete(timerId)
        }
      }

      useEffectFnRef.current = () => () => {
        timerIdsRef.current.forEach((id) => clearTimeoutFn(id))
        timerIdsRef.current.clear()
        // indicates that component has been unmounted
        timerIdsRef.current = EMPTY_OBJECT
      }
    }

    useEffect(useEffectFnRef.current!, EMPTY_ARRAY)

    // FIXME https://github.com/microsoft/TypeScript/issues/13948
    return {
      ...props,
      [propName]: setSafeTimeoutRef.current,
    } as any
  }

export const mapSafeTimeout = mapSafeTimeoutFactory(setTimeout, clearTimeout)
