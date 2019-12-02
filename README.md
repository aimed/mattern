# Mattern - Functional JS pattern matching for silly people

## Usage

```ts
import { match, otherwise } from "mattern"

const matcher = match(
  [{ someKeyThatMatchesExactly: "someValueThatMatchesExactly" }, () => "somePartiallyMatchedObject"],
  [Number, () => "anyNumber"],
  [otherwise, () => "anything"],
)

matcher({ someKeyThatMatchesExactly: "someValueThatMatchesExactly", someOtherValue: 1 }) // somePartiallyMatchedObject
matcher(1) // anyNumber
matcher(true) // anything
```

## Development

Testing:

```sh
yarn test
```
