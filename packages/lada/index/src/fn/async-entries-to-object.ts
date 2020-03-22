import { TAnyObject } from '../utils/types'

// TODO: constrain `K extends PropertyKey`
export const asyncEntriesToObject = async <K, V>(entries: AsyncIterable<readonly [K, V]>): Promise<TAnyObject> => {
  const obj = Object.create(null)

  for await (const entry of entries) {
    obj[entry[0]] = entry[1]
  }

  return obj
}
