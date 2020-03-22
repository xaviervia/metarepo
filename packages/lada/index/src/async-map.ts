import { asyncEntriesDelete } from './fn/async-entries-delete'
import { asyncEntriesDeleteKey } from './fn/async-entries-delete-key'
import { asyncEntriesDeleteValue } from './fn/async-entries-delete-value'
import { asyncEntriesFilterKeys } from './fn/async-entries-filter-keys'
import { asyncEntriesFilterValues } from './fn/async-entries-filter-values'
import { asyncEntriesGet } from './fn/async-entries-get'
import { asyncEntriesHas } from './fn/async-entries-has'
import { asyncEntriesHasKey } from './fn/async-entries-has-key'
import { asyncEntriesHasValue } from './fn/async-entries-has-value'
import { asyncEntriesKeys } from './fn/async-entries-keys'
import { asyncEntriesMapKeys } from './fn/async-entries-map-keys'
import { asyncEntriesMapValues } from './fn/async-entries-map-values'
import { asyncEntriesSet } from './fn/async-entries-set'
import { asyncEntriesToNativeMap } from './fn/async-entries-to-native-map'
import { asyncEntriesToObject } from './fn/async-entries-to-object'
import { asyncEntriesValues } from './fn/async-entries-values'
import { asyncFilter } from './fn/async-filter'
import { asyncForEach } from './fn/async-for-each'
import { asyncMap } from './fn/async-map'
import { asyncReduce } from './fn/async-reduce'
import { asyncSize } from './fn/async-size'
import { TMaybePromise, TAnyObject } from './utils/types'

// https://github.com/microsoft/TypeScript/issues/6223
export class AsyncMapClass<K, V> {
  private _entries: AsyncIterable<readonly [K, V]>

  constructor(entries?: AsyncIterable<readonly [K, V]> | Iterable<readonly [K, V]>) {
    this._entries = entries as AsyncIterable<readonly [K, V]>
  }

  [Symbol.asyncIterator](): AsyncIterable<readonly [K, V]> | Iterable<readonly [K, V]> {
    return this._entries
  }

  [Symbol.toStringTag](): string {
    return '[object AsyncMap]'
  }

  size(): Promise<number> {
    return asyncSize(this._entries)
  }

  has(entry: readonly [K, V]): Promise<boolean> {
    return asyncEntriesHas(entry, this._entries)
  }

  hasKey(key: K): Promise<boolean> {
    return asyncEntriesHasKey(key, this._entries)
  }

  hasValue(value: V): Promise<boolean> {
    return asyncEntriesHasValue(value, this._entries)
  }

  get(key: K): Promise<V | undefined> {
    return asyncEntriesGet(key, this._entries)
  }

  set(key: K, value: V): AsyncMapClass<K, V> {
    return new AsyncMapClass<K, V>(asyncEntriesSet(key, value, this._entries))
  }

  delete(entry: readonly [K, V]): AsyncMapClass<K, V> {
    return new AsyncMapClass(asyncEntriesDelete(entry, this._entries))
  }

  deleteValue(value: V): AsyncMapClass<K, V> {
    return new AsyncMapClass<K, V>(asyncEntriesDeleteValue(value, this._entries))
  }

  deleteKey(key: K): AsyncMapClass<K, V> {
    return new AsyncMapClass<K, V>(asyncEntriesDeleteKey(key, this._entries))
  }

  clear(): AsyncMapClass<K, V> {
    return new AsyncMapClass<K, V>()
  }

  entries(): AsyncIterable<readonly [K, V]> {
    return this._entries
  }

  keys(): AsyncIterable<K> {
    return asyncEntriesKeys(this._entries)
  }

  values(): AsyncIterable<V> {
    return asyncEntriesValues(this._entries)
  }

  forEach(callback: (entry: readonly [K, V], i: number) => TMaybePromise<void>): Promise<void> {
    return asyncForEach(callback, this._entries)
  }

  map<KR, VR>(mapper: (entry: readonly [K, V], i: number) => TMaybePromise<readonly [KR, VR]>): AsyncMapClass<KR, VR> {
    return new AsyncMapClass<KR, VR>(asyncMap(mapper, this._entries))
  }

  mapKeys<KR>(mapper: (key: K, i: number) => TMaybePromise<KR>): AsyncMapClass<KR, V> {
    return new AsyncMapClass<KR, V>(asyncEntriesMapKeys(mapper, this._entries))
  }

  mapValues<VR>(mapper: (value: V, i: number) => TMaybePromise<VR>): AsyncMapClass<K, VR> {
    return new AsyncMapClass<K, VR>(asyncEntriesMapValues(mapper, this._entries))
  }

  filter(filter: (entry: readonly [K, V], i: number) => TMaybePromise<boolean>): AsyncMapClass<K, V> {
    return new AsyncMapClass<K, V>(asyncFilter(filter, this._entries))
  }

  filterKeys(filter: (key: K, i: number) => TMaybePromise<boolean>): AsyncMapClass<K, V> {
    return new AsyncMapClass<K, V>(asyncEntriesFilterKeys(filter, this._entries))
  }

  filterValues(filter: (value: V, i: number) => TMaybePromise<boolean>): AsyncMapClass<K, V> {
    return new AsyncMapClass<K, V>(asyncEntriesFilterValues(filter, this._entries))
  }

  reduce<KR, VR>(reducer: (acc: [KR, VR][], entry: [K, V], i: number) => TMaybePromise<[KR, VR][]>, initial: [KR, VR][]) {
    // TODO: deal with readonly entries
    return new AsyncMapClass<KR, VR>(asyncReduce(reducer, initial, this._entries as AsyncIterable<[K, V]>))
  }

  toNativeMap(): Promise<Map<K, V>> {
    return asyncEntriesToNativeMap(this._entries)
  }

  toObject(): Promise<TAnyObject> {
    return asyncEntriesToObject(this._entries)
  }
}

export const AsyncMap = <K, V>(entries?: AsyncIterable<readonly [K, V]> | Iterable<readonly [K, V]>) => new AsyncMapClass(entries)
