import { matches } from "./matches"
import { instanceOf } from "./instanceOf"

describe("matches", () => {
  it("should match referential equality", () => {
    expect(matches(true, true)).toBe(true)
    expect(matches(false, false)).toBe(true)
    expect(matches(true, false)).toBe(false)
    expect(matches(null, false)).toBe(false)
    expect(matches(undefined, false)).toBe(false)
    expect(matches(null, "")).toBe(false)
    expect(matches(null, 0)).toBe(false)
    expect(matches(undefined, "")).toBe(false)
    expect(matches(undefined, 0)).toBe(false)
    expect(matches(undefined, null)).toBe(false)
    expect(matches(0, 0)).toBe(true)
    expect(matches(1, 1)).toBe(true)
    expect(matches(-1, -1)).toBe(true)
    expect(matches("", "")).toBe(true)
    expect(matches("a", "a")).toBe(true)
    expect(matches(undefined, undefined)).toBe(true)
    expect(matches(null, null)).toBe(true)
    const ref = {}
    expect(matches(ref, ref)).toBe(true)
  })

  it("should match Number", () => {
    expect(matches(Number, 1)).toBe(true)
  })

  it("should match Boolean", () => {
    expect(matches(Boolean, true)).toBe(true)
  })

  it("should match String", () => {
    expect(matches(String, "a")).toBe(true)
  })

  it("should match Date", () => {
    expect(matches(Date, new Date())).toBe(true)
  })

  it("should match RegExp", () => {
    expect(matches(/a/, "a")).toBe(true)
    expect(matches(/a/, "b")).toBe(false)
    expect(matches(/a/, 0)).toBe(false)
    expect(matches(/a/, null)).toBe(false)
    expect(matches(/a/, undefined)).toBe(false)
    expect(matches(/a/, [])).toBe(false)
    expect(matches(/a/, {})).toBe(false)
  })

  it("should match Array", () => {
    expect(matches(Array, [])).toBe(true)
    expect(matches(Array, {})).toBe(false)
  })

  it("should match Object", () => {
    expect(matches(Object, {})).toBe(true)
    expect(matches(Object, [])).toBe(false)
  })

  it("should recursively match Array elements", () => {
    expect(matches([], [])).toBe(true)
    expect(matches([0], [0])).toBe(true)
    expect(matches([Number], [0])).toBe(true)
    expect(matches([[0]], [[0]])).toBe(true)
    expect(matches([], 0)).toBe(false)
    expect(matches([], "")).toBe(false)
    expect(matches([], null)).toBe(false)
    expect(matches([], undefined)).toBe(false)
    expect(matches([], [0])).toBe(false)
    expect(matches([], [0, 0])).toBe(false)
    expect(matches([0], [])).toBe(false)
    expect(matches([0, 0], [])).toBe(false)
    expect(matches([], [undefined])).toBe(false)
    expect(matches([], [false])).toBe(false)
    expect(matches([], [null])).toBe(false)
    expect(matches([], [""])).toBe(false)
  })

  it("should recursively match Object values", () => {
    expect(matches({}, {})).toBe(true)
    expect(matches({ a: { aa: String } }, { a: { aa: "" } })).toBe(true)
    expect(matches({ a: String }, { a: "" })).toBe(true)
    expect(matches({ a: Number }, { a: 0 })).toBe(true)
    expect(matches({ a: Number, b: String }, { a: 0, b: "" })).toBe(true)
    expect(matches({ a: String }, { a: 1 })).toBe(false)
  })

  it("should recursively match partial Object values", () => {
    expect(matches({}, { a: 0 })).toBe(true)
  })

  it("should execute functions with the value", () => {
    expect(
      matches(function(v: any) {
        return Boolean(v)
      }, true),
    ).toBe(true)
    expect(matches((v: any) => Boolean(v), true)).toBe(true)
    expect(matches((v: any) => Boolean(v), false)).toBe(false)
  })

  it("should match instanceOf", () => {
    class A {}
    const a = new A()
    class AChild extends A {}
    const aChild = new AChild()
    class B {}
    const b = new B()
    expect(matches(instanceOf(A), a)).toBe(true)
    expect(matches(instanceOf(A), aChild)).toBe(true)
    expect(matches(instanceOf(A), b)).toBe(false)
    expect(matches(instanceOf(A), {})).toBe(false)
    expect(matches(instanceOf(A), null)).toBe(false)
    expect(matches(instanceOf(A), undefined)).toBe(false)
  })

  it("should type guard", done => {
    const a: string | number = "0"
    if (matches(String, a)) {
      // charAt exists on string, but not on number. This branch performs the type guard test of matches.
      expect(a.charAt(0)).toBe("0")
      done()
    } else {
      done(new Error("should type guard"))
    }
  })
})
