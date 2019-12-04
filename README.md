# Mattern - Functional JS pattern matching for silly people

Pattern matching brought to JS. Mattern does

- Match exact values
- Match primitives
- Match partial objects
- Match partially nested objects

```ts
match([String, (name: any) => `Hello ${name}`])("you")
```

## Usage

```ts
import { match, otherwise, instanceOf } from "mattern"

const matcher = match(
  [0, (value: any) => "Value is 0"],
  [true, (value: any) => "Value is true"],
  ["a", (value: any) => "Value is 'a'"],
  [String, (value: any) => "Value is a string"],
  [Number, (value: any) => "Value is a number"],
  [Boolean, (value: any) => "Value is a boolean"],
  [{ a: true }, (value: any) => "Value contains { a: true }"],
  [{ a: { b: true } }, (value: any) => "Value is deeply nested an contains { a: { b: true } }"],
  [instanceOf(MyClass), (value: any) => "Value is an instance of MyClass"],
  [myCustomMatcher, (value: any) => "Value is whatever myCustomMatcher says it is"],
  [(otherwise, (value: any) => `Value is anything else (${JSON.stringify(value)})`)],
)

matcher(0) // Value is 0
matcher(1) // Value is a number
matcher({ a: true }) // Value contains { a: true }"
matcher({ a: true, someOtherValue: 1 }) // Value contains { a: true }"
matcher({ x: 1 }) // Value is anything else ({ "x": 1 })
```

## Development

Testing:

```sh
yarn test
```
