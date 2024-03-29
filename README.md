# jotai-recoil-adapter

`jotai-recoil-adapter` is a library designed to facilitate the transition from Recoil to Jotai in React applications. It provides a drop-in Recoil-compatible API built on top of Jotai's state management capabilities.

<!-- TOC -->

- [jotai-recoil-adapter](#jotai-recoil-adapter)
  - [Quick Start](#quick-start)
  - [Usage](#usage)
    - [`RecoilRoot`](#recoilroot)
    - [`atom`](#atom)
    - [`atomAsync`](#atomasync)
    - [`selector`](#selector)
      - [Composing Jotai Atoms with `jotai-recoil-adapter`](#composing-jotai-atoms-with-jotai-recoil-adapter)
    - [`selectorDefault`](#selectordefault)
    - [`selector` (asynchronous) as `asyncSelector`](#selector-asynchronous-as-asyncselector)
    - [`selectorFamily`](#selectorfamily)
    - [`selectorFamilyDefault`](#selectorfamilydefault)
    - [`atomFamily`](#atomfamily)
    - [`atomFamilyAsync`](#atomfamilyasync)
    - [`useRecoilState`](#userecoilstate)
    - [`useRecoilValue`](#userecoilvalue)
    - [`useSetRecoilState`](#usesetrecoilstate)
    - [`useRecoilCallback`](#userecoilcallback)
    - [`useRecoilBridgeAcrossReactRootsUNSTABLE` (use with React portal)](#userecoilbridgeacrossreactrootsunstable-use-with-react-portal)
    - [`useRecoilBridgeAcrossReactRootsUNSTABLE` (use with react-three-fiber)](#userecoilbridgeacrossreactrootsunstable-use-with-react-three-fiber)
  - [Use-Case](#use-case)
  - [Warnings and Guidance](#warnings-and-guidance)
    - [Performance Concerns](#performance-concerns)
    - [Other Potential Concerns](#other-potential-concerns)
    - [Incompleteness of Recoil API in `jotai-recoil-adapter`](#incompleteness-of-recoil-api-in-jotai-recoil-adapter)
  - [Contributing](#contributing)
  - [Support and Issues](#support-and-issues)
  - [License](#license)

<!-- /TOC -->

## Quick Start

```
npm i jotai-recoil-adapter
```
The adapter supports the following Recoil features:
```ts
import {
  // standard Recoil APIs
  RecoilRoot,
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  // special adapters for compatibility
  atomAsync,
  atomFamilyAsync,
  asyncSelector,
  asyncSelectorFamily,
  selectorDefault,
  // non-standard adaptations, see Readme
  waitForAll,
} from 'jotai-recoil-adapter';
```

*Please read the [Use Case](#use-case) and [Warnings and Guidance](#warnings-and-guidance) section before use in business applications.*

## Usage

### `RecoilRoot`

Convenience adapter for Recoil's `<RecoilRoot />` component.

This component does nothing. It merely returns a `<React.Fragment />` that wraps child components.

```tsx
import { RecoilRoot } from 'jotai-recoil-adapter';

const App = () => <RecoilRoot> /* ... */ </RecoilRoot>
```

### `atom`

Basic atom creation:

```jsx
import { atom } from 'jotai-recoil-adapter';

const textState = atom({
  key: 'textState',
  default: 'Hello',
  effects: "UNSUPPORTED"
});
```

### `atomAsync`

Adapter for Recoil `atom` that are initialized with an async selector. To be used with the `selectorDefault` adapter as a default value.

```ts
interface AtomAsyncAdapterParams<T, U> {
  ...,
  default: Promise<T>;
  effects?: "UNSUPPORTED";
  fallback?: U;
};
```

```jsx
import { atom, atomAsync, selectorDefault } from 'jotai-recoil-adapter';

const userIdState = atom({
  key: 'userId',
  default: 1,
});

const userAtom = atomAsync({
  key: 'userAtom',
  default: selectorDefault({
    key: 'userAtomDefaultValueSelector',
    get: async ({ get }) => {
      const userId = get(userIdState);
      const response = await fetch(`/api/user/${userId}`);
      return response.json();
    },
  }),
  fallback: /* ... */
});
```

_Why is the API different from Recoil? Jotai's API isn't perfectly compatible with Recoil's. Remember: this adapter exists to help ease the migration from Recoil to Jotai._

**Important:** This adapter is implemented using Jotai's `getDefaultStore` method, therefore this is incompatible with custom Jotai store providers and must only be used in Jotai providerless mode.

### `selector`

Basic selector usage:

```jsx
import { atom, selector } from 'jotai-recoil-adapter';

const countState = atom({
  key: 'count-state',
  default: Math.PI
});

const doubleCountSelector = selector({
  key: 'double-count',
  get: ({ get }) => get(countState) * 2,
});
```

#### Composing Jotai Atoms with `jotai-recoil-adapter`

`jotai-recoil-adapter` allows seamless composition of Jotai `atom` and `atomFamily` with its `selector`, `selectorFamily`, and `useRecoilCallback`. This enables complex state management patterns while maintaining a consistent API.

In this example, a Jotai `PrimitiveAtom` is used with a `selector` from `jotai-recoil-adapter`. This pattern is extendable to other combinations, allowing you to take full advantage of Jotai's capabilities within a Recoil-like API.

```jsx
import { atom as jotaiAtom } from 'jotai';
import { selector, useRecoilValue } from 'jotai-recoil-adapter';

const countState = jotaiAtom(0);

const doubleCountSelector = selector({
  key: '...',
  get: ({ get }) => get(countState) * 2,
});
```

### `selectorDefault`

Special adapter for both synchronous and asynchronous Recoil `selector` that are used to initialize recoil `atom`.

```jsx
import {
  atom,
  atomFamily,
  selectorDefault
} from 'jotai-recoil-adapter';

const idState = atom({
  key: '...',
  default: 1,
});

const itemAtom = atom({
  key: '...',
  default: selectorDefault({
    key: '...',
    get: ({ get }) => {
      const id = get(idState);
      return createItem(id);
    },
  }),
});

const itemStateFamily = atomFamily({
  key: '...',
  default: (itemId: string) => `Item ${itemId}`,
});

const itemStateFamily = atomFamily({
  key: '...',
  default: selectorDefault({
    key: '...',
    get: ({ get }) => {
      ...
    }
  }),
});
```

**Important:** This adapter is implemented using Jotai's `getDefaultStore` method, therefore this is incompatible with custom Jotai store providers and must only be used in Jotai providerless mode.

### `selector` (asynchronous) as `asyncSelector`

Asynchronous selector implemented using a special adapter:

```ts
type AsyncRecoilSelectorOptions<T, U> = {
  key: string;
  get: ({ get }) => Promise<T>;
  fallback: U;
};
```

```jsx
import { asyncSelector } from 'jotai-recoil-adapter';

const randomNumberSelector = asyncSelector<number, "Crunching numbers...">({
  key: 'randomNumberSelector',
  get: async ({ get }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Math.random();
  },
  fallback: "Crunching numbers..."
});

const userDataSelector = asyncSelector<User, null>({
  key: 'userData',
  get: async ({ get }) => {
    const response = await fetch('/api/user/data');
    return response.json();
  },
  fallback: null
});
```

### `selectorFamily`

Atom family for creating a series of atoms based on parameters:

```jsx
import { selectorFamily } from 'jotai-recoil-adapter';

const itemStateFamily = selectorFamily({
  key: '...',
  default: (itemId: string) => ({ get }) => {
    /* ... */
  },
});
```

### `selectorFamilyDefault`

Special adapter for both synchronous and asynchronous Recoil `selectorFamily` that are used to initialize recoil `atomFamily`.

```jsx

import {
  atomFamily,
  selectorDefaultFamily
} from 'jotai-recoil-adapter';

const itemStateFamily = atomFamily({
  key: '...',
  default: selectorDefaultFamily({
    key: '...',
    get: (itemId: string) => ({ get }) => {
      ...
    }
  }),
});
```

**Important:** This adapter is implemented using Jotai's `getDefaultStore` method, therefore this is incompatible with custom Jotai store providers and must only be used in Jotai providerless mode.

### `atomFamily`

Atom family for creating a series of atoms based on parameters:

```jsx
import {
  atomFamily,
  selectorDefault,
  selectorDefaultFamily
} from 'jotai-recoil-adapter';

const itemStateFamily = atomFamily({
  key: `item-state-family`,
  default: (itemId: string) => `Item ${itemId}`,
});

const itemStateFamily = atomFamily({
  key: '...',
  default: selectorDefault({
    key: '...',
    get: ({ get }) => {
      ...
    }
  }),
});

const itemStateFamily = atomFamily({
  key: '...',
  default: selectorDefaultFamily({
    key: '...',
    get: (itemId: string) => ({ get }) => {
      ...
    }
  }),
});
```

### `atomFamilyAsync`

Adapter for Recoil `atomFamily` that are initialized with an async selector. To be used with the `selectorDefaultFamily` and `selectorDefault` adapters as a default values:

```ts
interface AtomFamilyAsyncAdapterParams<T, Param, U> {
  default: Promise<T>;
  effects?: "UNSUPPORTED";
  fallback?: U;
}
```

```ts
import { selectorDefault, selectorDefaultFamily, atomAsync } from 'jotai-recoil-adapter';
 
const fooStateFamily = atomFamilyAsync({
  key: 'foo-atom-family',
  default: selectorDefaultFamily({
     key: 'foo-atom-family-default-value-selector',
     get: (param) => async ({ get }) => {
      const data = await fetchData(`v1/api/data/${ param }`);
      const composedValue = get(someOtherAtom);
      return doStuffWith(composedValue, data);
     }
  }),
  fallback: /* ... */
});

const barStateFamily = atomFamilyAsync({
  key: 'bar-atom-family',
  default: selectorDefault({
     key: 'bar-atom-family-default-value-selector',
     get: async ({ get }) => {
      const data = await fetchData();
      const composedValue = get(someOtherAtom);
      return doStuffWith(composedValue, data);
     }
  }),
  fallback: /* ... */
});
```

**Important:** This adapter is implemented using Jotai's `getDefaultStore` method, therefore this is incompatible with custom Jotai store providers and must only be used in Jotai providerless mode.

### `useRecoilState`

Hook to read and write atom state:

```jsx
import { useRecoilState } from 'jotai-recoil-adapter';

const [text, setText] = useRecoilState(textState);
```

### `useRecoilValue`

Hook to read atom or selector state:

```jsx
import { useRecoilValue } from 'jotai-recoil-adapter';

const count = useRecoilValue(countSelector);
```

### `useSetRecoilState`

Hook to update atom state:

```jsx
import { useSetRecoilState } from 'jotai-recoil-adapter';

const setCount = useSetRecoilState(countState);
```

### `useRecoilCallback`

Hook to interact with multiple atoms/selectors:

```jsx
import { useRecoilCallback } from 'jotai-recoil-adapter';

const logCount = useRecoilCallback(
  ({ snapshot }) => async () => {
    const count = await snapshot.getPromise(countState);
    console.log(count);
  },
  [...]
);
```

### `useRecoilBridgeAcrossReactRoots_UNSTABLE` (use with React portal)

Use Jotai's `Provider` component.

### `useRecoilBridgeAcrossReactRoots_UNSTABLE` (use with react-three-fiber)

Recommendation is to use Jotai's "providerless mode".

see: https://github.com/pmndrs/jotai/issues/683#issuecomment-995764515

## Use-Case

The primary use-case for `jotai-recoil-adapter` is to facilitate an incremental migration from Recoil to Jotai. This is particularly useful in scenarios where:

- **Large Codebases**: Applications with a significant investment in Recoil can migrate to Jotai gradually, without needing a complete rewrite.
- **Testing and Stability**: It allows for piece-by-piece migration and testing, ensuring that the application remains stable and reliable throughout the process.
- **Learning Curve**: Teams can adapt to Jotai's concepts and APIs at a comfortable pace, reducing the learning curve.
- **Coexistence**: Enables the coexistence of Recoil and Jotai during the transition period, allowing for a phased-out deprecation of Recoil.

This approach minimizes disruption in development workflows and provides a path to leverage Jotai's simplicity and performance benefits without the upfront cost of a full-scale migration.

## Warnings and Guidance

### Performance Concerns

While `jotai-recoil-adapter` aims to provide a seamless transition from Recoil to Jotai, there are potential performance implications to consider:

- **Overhead**: The adapter introduces an additional abstraction layer, which could lead to slight performance overhead compared to using Jotai or Recoil directly.
- **Optimization Differences**: Jotai and Recoil have different optimization strategies. Be aware that performance characteristics may change when migrating from Recoil to Jotai.

You should thoroughly test and measure your application before and after applying this adapter to insure against regressions.

### Other Potential Concerns

- **Context Propagation**: The context propagation mechanisms in Jotai and Recoil are different. This could lead to unexpected behavior, especially in complex component trees or when using context-dependent features.
- **Error Handling**: The error handling paradigms in Jotai and Recoil might differ. Pay attention to how errors are handled and propagated in your application after the migration.

### Incompleteness of Recoil API in `jotai-recoil-adapter`

`jotai-recoil-adapter` does not cover the entire API surface of Recoil. Some advanced features and utilities provided by Recoil might not have equivalents in this adapter.

It's important to review your current usage of Recoil and determine if any advanced features critical to your application are not supported by the adapter. Plan for alternative solutions or adjustments in such cases.

## Contributing

Contributions to `jotai-recoil-adapter` are welcome. To contribute, fork the repository, create a feature branch, commit your changes, and open a Pull Request.

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## Support and Issues

For issues or support questions, please file an issue on the GitHub repository.

## License

`jotai-recoil-adapter` is released under the MIT License.

