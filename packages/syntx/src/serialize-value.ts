/* eslint-disable import/no-cycle */
import { isValidElement } from 'react'
import { TConfig, TSerializedElement, TMeta } from './types'
import { serializeObject } from './serialize-object'
import { serializeArray } from './serialize-array'
import { serializeElement } from './serialize-element'
import { isArray, isBoolean, isFunction, isNull, isNumber, isObject, isSymbol, getElementName } from './utils'
import { TYPE_VALUE_FUNCTION, TYPE_VALUE_NULL, TYPE_VALUE_NUMBER, TYPE_VALUE_BOOLEAN, TYPE_VALUE_SYMBOL, TYPE_VALUE_STRING, TYPE_QUOTE } from './constants'

export type TSerializeValue = {
  value: any,
  currentIndent: number,
  config: TConfig,
  meta?: TMeta,
}

export const serializeValue = ({ value, currentIndent, meta, config }: TSerializeValue): TSerializedElement => {
  if (isValidElement(value)) {
    return serializeElement({
      name: getElementName(value),
      props: value.props,
      currentIndent,
      meta,
      config,
    })
  }

  if (isObject(value)) {
    return serializeObject({
      obj: value,
      currentIndent,
      config,
      meta,
    })
  }

  if (isArray(value)) {
    return serializeArray({
      arr: value,
      currentIndent,
      config,
      meta,
    })
  }

  if (isFunction(value)) {
    return {
      head: [{ type: TYPE_VALUE_FUNCTION, value: '() => {}' }],
      body: [],
      tail: [],
    }
  }

  if (isNull(value)) {
    return {
      head: [{ type: TYPE_VALUE_NULL, value: 'null' }],
      body: [],
      tail: [],
    }
  }

  if (isNumber(value)) {
    return {
      head: [{ type: TYPE_VALUE_NUMBER, value: String(value) }],
      body: [],
      tail: [],
    }
  }

  if (isBoolean(value)) {
    return {
      head: [{ type: TYPE_VALUE_BOOLEAN, value: String(value) }],
      body: [],
      tail: [],
    }
  }

  if (isSymbol(value)) {
    const matched = value.toString().match(/^Symbol\((.+)\)$/)

    return {
      head: [{ type: TYPE_VALUE_SYMBOL, value: matched?.[1] ?? 'symbol' }],
      body: [],
      tail: [],
    }
  }

  return {
    head: [
      { type: TYPE_QUOTE, value: '\'' },
      { type: TYPE_VALUE_STRING, value: String(value).replace(/'/g, '"') },
      { type: TYPE_QUOTE, value: '\'' },
    ],
    body: [],
    tail: [],
  }
}
