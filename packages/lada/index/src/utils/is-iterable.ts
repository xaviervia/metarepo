export const isIterable = (arg: any): arg is Iterable<any> => Reflect.has(arg, Symbol.iterator)
