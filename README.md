# @plandek-utils/safe-parsing

[![JSR Scope](https://jsr.io/badges/@plandek-utils)](https://jsr.io/@plandek-utils)
[![JSR](https://jsr.io/badges/@plandek-utils/safe-parsing)](https://jsr.io/@plandek-utils/safe-parsing)
[![JSR Score](https://jsr.io/badges/@plandek-utils/safe-parsing/score)](https://jsr.io/@plandek-utils/safe-parsing)
[![Maintainability](https://api.codeclimate.com/v1/badges/f5f977daeb40e6109ae4/maintainability)](https://codeclimate.com/github/plandek-utils/safe-parsing/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f5f977daeb40e6109ae4/test_coverage)](https://codeclimate.com/github/plandek-utils/safe-parsing/test_coverage)

`safeFloat` and `safeString` and related utils.

## Usage

### Floats

- `safeFloat(arg: unknown): number`: is equivalent to call `safeFloatWithDefault(arg, 0)`
- `safeFloats(arg: unknown): number[]`: is equivalent to call `safeFloatsWithDefault(arg, 0)`
- `safeFloatWithDefault<T extends number|null>(arg: unknown, defaultValue: T): number | T`: parses as a single number, using the default if it cannot get a valid one.
- `safeFloatsWithDefault<T extends number | null>(arg: unknown, defaultValue: T): Array<number | T>`: calls safeFloatWithDefault on each element of the given list (array or set)


```ts
import { safeFloat, safeFloats, safeFloatWithDefault, safeFloatsWithDefault } from "@plandek-utils/safe-parsing";

safeFloat(null) // 0
safeFloat("") // 0
safeFloat(NaN) // 0
safeFloat(Infinity) // 0
safeFloat("  whatever is this ") // 0
safeFloat(BigInt(1234)) // 1234
safeFloat(BigInt(Number.MAX_VALUE) + BigInt(10)) // Number.MAX_VALUE
safeFloat("  413.3 ") // 413.3
safeFloat("   413 ") // 413
safeFloat(413.3) // 413.3
safeFloat(413) // 413
safeFloat([42, 13, 23]) // 42
safeFloat([" 42 ", "13", "23"]) // 42
safeFloat(new Set([42, 13, 23])) // 42
safeFloat(new Set([" 42 ", "13", "23"])) // 42
safeFloat([]) // 0
safeFloat(new Set()) // 0
safeFloat(d1) // 0
safeFloat(d2) // 0

safeFloats(["1", 2, " 3.4  ", "whatever"]) // [1, 2, 3.4, 0]
safeFloats("123") // [123]
safeFloatsWithDefault(["1", 2, " 3.4  ", "whatever"], 999) // [1, 2, 3.4, 999]
safeFloatsWithDefault("123", 999) // [123]

safeFloatWithDefault(42, null) // 42
safeFloatWithDefault(-Infinity, null) // null
safeFloatWithDefault(Infinity, null) // null
safeFloatWithDefault([42], null) // 42
safeFloatWithDefault([-Infinity], null) // null
safeFloatWithDefault([Infinity], null) // null
safeFloatWithDefault(true, 5) // 5
safeFloatWithDefault({}, 5) // 5
safeFloatWithDefault([], 5) // 5
safeFloatWithDefault("abc", 5) // 5
safeFloatWithDefault("3.14", 5) // 3.14
safeFloatWithDefault("invalid", 5) // 5
safeFloatWithDefault(["1.23"], null) // 1.23
safeFloatWithDefault(["a", "b", "c"], null) // null
```

### Strings

- `safeString(arg: unknown): string`: Parses the argument as a string, returning empty string if not possible.
- `safeStrings(arg: unknown): string[]`: Wraps the given argument in an array, unless it is already an array. If it is a Set it converts it into an array. Then calls safeString on each element. It removes nulls and undefined before returning the result.


For `safeString`: if the argument is:

- a string, return it.
- a number or bigint, return its string representation.
- a Date or a Dayjs, return its ISO string.
- an array, return the safe string of its first element.

Otherwise, return an empty string.

```ts
import { safeString, safeStrings } from "@plandek-utils/safe-parsing";

const str = "  whatever is this ";

safeString(null) // ""
safeString(str) // str
safeString(str) // str
safeString([str]) // str
safeString([str, "another shit"]) // str
safeString(341) // "341"
safeString(NaN) // ""
safeString(Infinity) // ""
safeString(d1) // str
safeString(d2) // d2.toISOString()
safeString(parseDayjs(d1)) // str
safeString(parseDayjs(d2)) // d2.toISOString()

safeStrings([null, "whatever", NaN, 12]) // ["whatever", "12"]
safeStrings(123) // ["123"]
```

## Development

This package is developed with deno 2. The production code is in `src/mod.ts` and its test in
`src/__tests__/mod.spec.ts`

- `deno fmt src`: format files
- `deno lint src`: lint files
- `deno dev`: run tests on each change in mod.ts
- `deno run test && deno run lcov && deno run html`: run the tests with coverage, then convert to lcov and prepare in
  `html_cov` an HTML export of the coverage info.
