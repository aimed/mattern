import { match } from "./match"
import { otherwise } from "./otherwise"

describe("match", () => {
  describe("otherwise", () => {
    it("should always match the default", () => {
      const matcher = match([otherwise, () => "Default"])
      expect(matcher(0)).toEqual("Default")
    })

    it("should match the default if no match exists", () => {
      const matcher = match(
        [1, () => "Not default"],
        [otherwise, () => "Default"],
      )
      expect(matcher(0)).toEqual("Default")
    })
  })

  describe("primitives", () => {
    const matcher = match(
      ["", () => "String"],
      [0, () => "Number"],
      [true, () => "True"],
      [false, () => "False"],
      [null, () => "Null"],
      [undefined, () => "Undefined"],
    )

    it('should match ""', () => {
      expect(matcher("")).toEqual("String")
    })

    it("should match 0", () => {
      expect(matcher(0)).toEqual("Number")
    })

    it("should match true", () => {
      expect(matcher(true)).toEqual("True")
    })

    it("should match false", () => {
      expect(matcher(false)).toEqual("False")
    })

    it("should match null", () => {
      expect(matcher(null)).toEqual("Null")
    })

    it("should match undefined", () => {
      expect(matcher(undefined)).toEqual("Undefined")
    })
  })

  describe("objects", () => {
    const matcher = match(
      [{ type: "string" }, () => "String"],
      [{ type: "number" }, () => "Number"],
      [{ type: "nested", array: [0] }, () => "Nested array"],
      [{ type: "nested", object: { a: "a" } }, () => "Nested object"],
    )

    it("should match positive matchers", () => {
      expect(matcher({ type: "string" })).toEqual("String")
    })

    it("should match positive matchers with the correct value", () => {
      expect(matcher({ type: "number" })).toEqual("Number")
    })

    it("should match nested matchers array", () => {
      expect(matcher({ type: "nested", array: [0] })).toEqual("Nested array")
    })

    it("should match nested matchers object", () => {
      expect(matcher({ type: "nested", object: { a: "a" } })).toEqual(
        "Nested object",
      )
    })

    it.each([{ a: "b" }, undefined, null, 1, "string"])(
      "should not match (%o)",
      (input: any) => {
        expect(() => matcher(input)).toThrowError()
      },
    )
  })
})
