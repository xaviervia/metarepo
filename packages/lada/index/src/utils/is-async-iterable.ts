export const isAsyncIterable = (arg: any): arg is AsyncIterable<any> => Reflect.has(arg, Symbol.asyncIterator)
