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
  Parameter,
} from "src/core/types";
import { registerEffects } from "src/core/atom-effect";
import { getDefaultStore } from "jotai";

/**
 * Use defaultStore from Jotai's Providerless mode to mimick
 * Recoil's API for initializing default atom default values with
 * async selectors.
 */
const defaultStore = getDefaultStore();

/**
 * Adapter for Recoil's standard primitive `atomFamily`.
 */
export function atomFamily<T, Param extends Parameter>(
  params: AtomFamilyAdapterParams<T, Param>,
) {
  const stateFam = jotaiAtomFamily((param: Param) => {
    const defaultValue =
      typeof params.default === "function"
        ? (params.default as GetAtomFamilyDefaultValue<T, Param>)(param)
        : params.default;
    const baseAtom = jotaiAtom(defaultValue) as AtomAdapter<T>;
    if (params.effects) {
      const effects = params.effects(param);
      registerEffects(baseAtom, effects, defaultValue);
    }
    return baseAtom;
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
export function atomFamilyAsync<T, Param extends Parameter, U>(
  params: AtomFamilyAsyncAdapterParams<T, Param, U>,
) {
  const stateFam = jotaiAtomFamily((param: Param) => {
    const defaultValuePromise =
      typeof params.default === "function"
        ? (params.default as GetAtomFamilyAsyncDefaultValue<T | U, Param>)(
            param,
          )
        : params.default;
    const baseAtom = unwrap(jotaiAtom(defaultValuePromise)) as AtomAdapter<
      T | U
    >;
    defaultValuePromise.then((value) => {
      defaultStore.set(baseAtom, value);
    });
    if (params.effects) {
      const effects = params.effects(param);
      registerEffects(baseAtom, effects, params.fallback);
    }
    return baseAtom;
  }, deepEqual);
  return stateFam;
}
