import { concat } from './concat'

export const startWith = <T>(value: T) => (iterable: Iterable<T>): Iterable<T> =>
  concat([value], iterable)
