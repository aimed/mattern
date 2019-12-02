// prettier-ignore
export type TypeOf<T> 
  = T extends NumberConstructor ? number
  : T extends StringConstructor ? string
  : T extends BooleanConstructor ? boolean
  : T extends DateConstructor ? Date
  : T extends RegExp ? string
  : T extends null ? null
  : T extends undefined ? undefined
  : T extends true ? true
  : T extends false ? false
  : T extends string ? Readonly<T>
  : T extends number ? Readonly<T>
  : T extends Function ? any
  : T extends {} ? { [K in keyof T]: TypeOf<T[K]> }
  : any

/**
 * Matches the value against the target.
 * @param target The target value or type. If this is a function, the function will be called with the value.
 * @param value The value to match.
 */
export function matches<T>(target: T, value: any): value is TypeOf<T> {
  // Cover all primitives.
  if (target === value) {
    return true
  }

  // If any of these is null or undefined, the other value is not, because they do not strict equal.
  if (
    value === undefined ||
    target === undefined ||
    value === null ||
    target === null
  ) {
    return false
  }

  if ((target as any) === Boolean) {
    return value.constructor === Boolean
  }

  if ((target as any) === Number) {
    return value.constructor === Number
  }

  if ((target as any) === String) {
    return value.constructor === String
  }

  if ((target as any) === Date) {
    return value.constructor === Date
  }

  if ((target as any) === Array) {
    return Array.isArray(value)
  }

  if ((target as any) === Object) {
    return typeof value === "object" && !Array.isArray(value)
  }

  if (target instanceof RegExp) {
    if (typeof value === "string") {
      return target.test(value)
    }
    return false
  }

  if (Array.isArray(target)) {
    if (!Array.isArray(value)) {
      return false
    }

    if (target.length !== value.length) {
      return false
    }

    return target.every((t: any, i: number) => matches(t, value[i]))
  }

  if (typeof target === "function") {
    // Execute functions with the value.
    return target(value)
  }

  if (
    typeof target === "object" &&
    typeof value === "object" &&
    !Array.isArray(target) &&
    !Array.isArray(value)
  ) {
    // Perform partial matching.
    return Object.keys(target as any).every((key: any) =>
      matches((target as any)[key] as any, (value as any)[key] as any),
    )
  }

  return false
}
