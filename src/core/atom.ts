import { getDefaultStore } from "jotai";
import { atomWithReset as jotaiAtom } from "jotai/utils";
import {
  AtomAdapter,
  AtomAdapterParams,
  AtomAsyncAdapterParams,
} from "src/core/types";
import { registerEffects } from "src/core/atom-effect";

/**
 * Use defaultStore from Jotai's Providerless mode to mimick
 * Recoil's API for initializing default atom default values with
 * async selectors.
 */
const defaultStore = getDefaultStore();

/**
 * Adapter for Recoil's standard primitive `atom`.
 */
export function atom<T>(params: AtomAdapterParams<T>): AtomAdapter<T> {
  const baseAtom = jotaiAtom(params.default) as AtomAdapter<T>;
  if (params.effects) {
    registerEffects(baseAtom, params.effects, params.default);
  }
  return baseAtom;
}

/**
 * Adapter for Recoil `atom` that are initialized with an async selector.
 * To be used with the `selectorDefault` adapter as a default value:
 *```ts
 * import { selectorDefault, atomAsync } from 'jotai-recoil-adapter';
 *
 * const fooState = atomAsync({
 *   key: 'foo-atom',
 *   default: selectorDefault({
 *      key: 'foo-atom-default-value-selector',
 *      get: async ({ get }) => {
 *       const data = await fetchData();
 *       const composedValue = get(someOtherAtom);
 *       return doStuffWith(composedValue, data);
 *      }
 *   }),
 * });
 *```
 * WARNING: This adapter depends on Jotai's getDefaultStore() method,
 * and therefore only works in Jotai Providerless mode.
 */
export function atomAsync<T, U>(
  params: AtomAsyncAdapterParams<T, U>,
): AtomAdapter<T | U> {
  const { default: defaultValuePromise, fallback } = params;
  const baseAtom = jotaiAtom(fallback) as AtomAdapter<T | U>;
  defaultValuePromise.then((value) => {
    defaultStore.set(baseAtom, value);
  });
  if (params.effects) {
    registerEffects(baseAtom, params.effects, params.fallback);
  }
  return baseAtom;
}
