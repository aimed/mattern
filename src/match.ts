import { matches, TypeOf } from "./matches"

type Executor<TIs, TResult> = (value: TypeOf<TIs>) => TResult
type Matcher<TIs, TResult> = [TIs, Executor<TIs, TResult>]

export function match<TResult = any>(...patterns: Matcher<any, TResult>[]) {
  return function matcherFunction(value: any): TResult {
    for (const pattern of patterns) {
      const [target, executor] = pattern

      if (matches(target, value)) {
        return executor(value)
      }
    }

    throw new Error(`Unmatched value ${value}`)
  }
}
