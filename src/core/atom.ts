import { getDefaultStore } from "jotai";
import { atomWithReset as jotaiAtom } from "jotai/utils";
import {
  AtomAdapter,
  AtomAdapterParams,
  AtomAsyncAdapterParams,
} from "src/core/types";

/**
 * Adapter for Recoil's standard primitive `atom`.
 */
export function atom<T>(params: AtomAdapterParams<T>): AtomAdapter<T> {
  return jotaiAtom(params.default) as AtomAdapter<T>;
}

const defaultStore = getDefaultStore();
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
export function atomAsync<T, U>({
  default: defaultValuePromise,
  fallback,
}: AtomAsyncAdapterParams<T, U>): AtomAdapter<T | U> {
  const baseAtom = jotaiAtom(fallback) as AtomAdapter<T | U>;
  defaultValuePromise.then((value) => {
    defaultStore.set(baseAtom, value);
  });
  return baseAtom;
}
