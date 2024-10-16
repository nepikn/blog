# Testing

- [Target](#target)
- [Framework / Runner](#framework--runner)
  - [Configuration](#configuration)
  - [Globals / Test](#globals--test)
  - [Expect](#expect)
  - [Mock](#mock)
  - [Tooling](#tooling)
- [`@testing-library/dom`](#testing-librarydom)
  - [Query](#query)
  - [Debug](#debug)
  - [Fire Events](#fire-events)
- [`@testing-library/user-event`](#testing-libraryuser-event)
- [`@testing-library/react`](#testing-libraryreact)
  - [`render(COMPONENT, OPTIONS?): RESULT`](#rendercomponent-options-result)
- [Reference](#reference)

## Target

- unit
- integration
- E2E

## Framework / Runner

- `jest`
- `vitest`

### Configuration

#### Jest

```javascript
// babel.config.js
/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [
    // enable ESM Support
    ["@babel/preset-env"],
    // for React
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
```

```javascript
// jest.config.js
/** @type {import('jest').Config} */
module.exports = {
  // simulates browser
  testEnvironment: "jsdom",
  // for scripts that require `it` `test` ...
  setupFilesAfterEnv: ["./setup/jest.js"],
  // minimal setup for coverage
  // run by `jest --coverage`
  collectCoverageFrom: ["src/**/*.js"],
  coverageDirectory: "coverage",
};
```

```javascript
// setup/jest.js
import "@testing-library/jest-dom";
```

```javascript
// eslint.config.js
import globals from "globals";

export default [
  {
    files: ["**/*.test.js?(x)"],
    languageOptions: {
      globals: globals.jest,
    },
  },
];
```

#### Vitest

```javascript
// vite.config.js
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // for React
  plugins: [react()],
  test: {
    // simulates browser
    environment: "jsdom",
    setupFiles: ["./setup/vitest.js"],
  },
});
```

```javascript
// setup/vitest.js
import "@testing-library/jest-dom/vitest";
```

### Globals / Test

- `{before | after}{All | Each}(CB, TIMEOUT=5000)`
- `test[.only](NAME, CB, TIMEOUT=5000)`
  - `CB` either
    - `() => { ... }`
    - `() => PROMISE`
    - `(done) => { ...; done(ERROR?) }`
- `describe[.only](NAME, CB)` group tests

#### Configue Globals / Test

- Jest
  - [`@types/jest`](https://www.npmjs.com/package/@types/jest) for VS Code suggestion
  - may be imported from [`@jest/globals`](https://www.npmjs.com/package/@jest/globals)
- Vitest
  - may be enabled by `test.globals: true`

### [Expect](https://jestjs.io/docs/expect)

#### Assertion

`expect(SOURCE)[.MODIFIER].MATCHER`

- `MODIFIER`
  - `not`
  - `resolves` unwrap the value of the fulfilled `SOURCE`
  - `rejects` unwrap the reason of the rejected `SOURCE`
- `MATCHER`
  - `toBe(VAL)` uses `Object.is`
  - `toEqual(VAL)` deep equality
  - `toStrictEqual(VAL)` same structure and type
  - `toBeCloseTo(FLOAT)`
  - `toMatch(ARG)`
    - `/REGEXP/`
    - `'STRING'`
  - `toContain(ELEMENT)`
  - `toThrow(ARG?)` given `error` thrown by `SOURCE`
    - `CLASS` class of `error`
    - `/REGEXP/` matched to `error.message`
    - `'STRING'` included by `error.message`
    - `{message: MESSAGE}` `MESSAGE` equal to `error.message`
  - ... and extends by [`jest-dom`](https://github.com/testing-library/jest-dom?tab=readme-ov-file#custom-matchers)
- sugar `MATCHER` for `MOCK_INSTANCE` as `SOURCE`
  - `.toHaveBeenCalled()` same as `expect(MOCK_INSTANCE.mock.calls.length).toBeGreaterThan(0)`

#### Assertion Count

- `expect.assertions(+INT)`
- `expect.hasAssertions()`

### Mock

|               | Jest            | Vitest                         |
| ------------- | --------------- | ------------------------------ |
| `HELPER`      | `jest`          | `vi`                           |
| `GET_EXPORTS` | `() => EXPORTS` | `(importOriginal?) => EXPORTS` |

- `MOCK_INSTANCE`
  - `HELPER.fn(GET_EXPORTS?)`
  - `(HELPER.mock('MODULE_PATH', GET_EXPORTS), MODULE[.METHOD])`
- method
  - `.mock` given called by `...args1` `...args2` ... `...argsN`
    - `.calls` returns `[args1, args2, ..., argsN]`
    - `.results[N]` returns
      - type `'return' | 'throw' | 'incomplete'`
      - value `CB(...argsN)`
  - `.mock{Return | Resolved | Rejected}Value[Once](VAL)`
  - `.mockImplementation[Once](GET_EXPORTS)`
  - `.mockReturnThis()` implent `function() { return this }`
  - `.mockName(NAME)`

### Tooling

- [Awesome Jest](https://github.com/jest-community/awesome-jest)
- ️[Testing Playground](https://testing-playground.com)

## `@testing-library/dom`

### [Query](https://testing-library.com/docs/queries/about)

- `screen.QUERY(TEXT_MATCH, OPTIONS)`
- `within(NODE).QUERY(TEXT_MATCH, OPTIONS)`
- `QUERY(NODE, TEXT_MATCH, OPTIONS)`

#### `OPTIONS`

- `exact=true` whether to match the full content
- `normalizer?: (textContent) => STRING`

#### `TEXT_MATCH`

- `'STRING'`
- `/REGEXP/`
- `(textContent, node) => BOOLEAN`

#### `QUERY`

`{METHOD}[All]By{TEXT_MATCH}`

- `{METHOD}` throws error / rejects finding more than one matched
- `{METHOD}` / `{METHOD}All` if no element found
  - `get` throws error / error
  - `query` returns `null` / `[]`
  - `find` retuns a promise
    - resolves with the matched
    - rejects after timeout (1000ms)

### [Debug](https://testing-library.com/docs/dom-testing-library/api-debugging)

- `prettyDOM(NODE, ...)` prints the DOM tree of `NODE`
- `screen.debug(NODE=document.body)` essentially `console.log(prettyDOM(NODE))`

### [Fire Events](https://testing-library.com/docs/dom-testing-library/api-events/)

`fireEvent.EVENT(NODE, OPTIONS?)`

- [`EVENT`](https://github.com/testing-library/dom-testing-library/blob/main/src/event-map.js)
- `OPTIONS`
  - `target: {}` props assigned to `NODE`

## [`@testing-library/user-event`](https://testing-library.com/docs/user-event/intro/)

`userEvent`

```javascript
function setup(component) {
  return {
    user: userEvent.setup(),
    ...render(component),
  };
}

it("", async () => {
  const { user, getByRole } = setup(<App />);

  await user.type(getByRole("textbox"), "");
});
```

## `@testing-library/react`

### `render(COMPONENT, OPTIONS?): RESULT`

- `OPTIONS`
  - `container`
    - where `COMPONENT` appended
    - default to `<div>` appended to the `document.body`
- `RESULT`
  - `getByRole, ...` bound to `COMPONENT`

## Reference

- [Jest](https://jestjs.io/docs/api)
- [Vitest](https://vitest.dev/api/)
- [Testing Library](https://testing-library.com/docs/queries/about)
- [React Testing Library Tutorial](https://www.robinwieruch.de/react-testing-library/)
