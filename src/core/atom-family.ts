import {
  atomFamily as jotaiAtomFamily,
  atomWithReset as jotaiAtom,
  unwrap,
} from "jotai/utils";
import deepEqual from "fast-deep-equal";
import {
  AtomAdapter,
  AtomFamilyAdapterParams,
  AtomFamilyAsyncAdapterParams,
  GetAtomFamilyAsyncDefaultValue,
  GetAtomFamilyDefaultValue,
} from "./types";

/**
 * Adapter for Recoil's standard primitive `atomFamily`.
 */
export function atomFamily<T, Param>(
  params: AtomFamilyAdapterParams<T, Param>,
) {
  const stateFam = jotaiAtomFamily((param: Param) => {
    const defaultValue =
      typeof params.default === "function"
        ? (params.default as GetAtomFamilyDefaultValue<T, Param>)(param)
        : params.default;
    return jotaiAtom(defaultValue) as AtomAdapter<T>;
  }, deepEqual);
  return stateFam;
}

/**
 * Adapter for Recoil `atomFamily` that are initialized with an async selector. To be used
 * with the `selectorDefaultFamily` and `selectorDefault` adapters as a default values:
 *```ts
 * import { selectorDefault, selectorDefaultFamily, atomAsync } from 'jotai-recoil-adapter';
 *
 * const fooStateFamily = atomFamilyAsync({
 *   key: 'foo-atom-family',
 *   default: selectorDefaultFamily({
 *      key: 'foo-atom-family-default-value-selector',
 *      get: (param) => async ({ get }) => {
 *       const data = await fetchData(`v1/api/data/${ param }`);
 *       const composedValue = get(someOtherAtom);
 *       return doStuffWith(composedValue, data);
 *      }
 *   }),
 * });
 *
 * const barStateFamily = atomFamilyAsync({
 *   key: 'bar-atom-family',
 *   default: selectorDefault({
 *      key: 'bar-atom-family-default-value-selector',
 *      get: () => async ({ get }) => {
 *       const data = await fetchData();
 *       const composedValue = get(someOtherAtom);
 *       return doStuffWith(composedValue, data);
 *      }
 *   }),
 * });
 *
 *```
 * WARNING: This adapter depends on Jotai's getDefaultStore() method,
 * and therefore only works in Jotai Providerless mode.
 */
export function atomFamilyAsync<T, Param, U>(
  params: AtomFamilyAsyncAdapterParams<T, Param, U>,
) {
  const stateFam = jotaiAtomFamily((param: Param) => {
    const defaultValue =
      typeof params.default === "function"
        ? (params.default as GetAtomFamilyAsyncDefaultValue<T, Param>)(param)
        : params.default;
    return unwrap(jotaiAtom(defaultValue)) as AtomAdapter<T>;
  }, deepEqual);
  return stateFam;
}
