export type TMaybePromise<T> = Promise<T> | T

export type TAnyObject = {
  [key in PropertyKey]: any
}
