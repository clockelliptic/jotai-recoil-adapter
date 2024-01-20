import { atom, Getter, SetStateAction, Setter, getDefaultStore } from "jotai";
import { RESET, atomFamily, unwrap } from "jotai/utils";
import deepEqual from "fast-deep-equal";
import {
  AsyncSelectorFamilyAdapterParams,
  AtomAdapter,
  SelectorDefaultFamilyAdapterParams,
  SelectorFamilyAdapterParams,
} from "./types";

/**
 * Adapter for Recoil's standard synchronous `selectorFamily`.
 *
 * Note: for async selector families, use `import { asyncSelectorFamily } from 'jotai-recoil-adapter'`
 */
export function selectorFamily<T, Param>(
  options: SelectorFamilyAdapterParams<T, Param>,
) {
  const fam = atomFamily<Param, AtomAdapter<T>>((param) => {
    const read = (get: Getter) => options.get(param)({ get });
    const write = (get: Getter, set: Setter, newValue: SetStateAction<T>) => {
      const reset = <Value>(
        atom: AtomAdapter<Value>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) => set(atom, RESET as any);
      if (options.set) {
        return options.set?.(param)({ get, set, reset }, newValue);
      }
      return;
    };
    return atom(read, write);
  }, deepEqual);
  return fam;
}

const defaultStore = getDefaultStore();
/**
 * Special adapter for both synchronous and asynchronous Recoil `selectorFamily` that
 * are used to initialize Recoil `atomFamily`.
 *
 * WARNING: Depends on Jotai's getDefaultStore() method.
 * Only works in Jotai Providerless mode.
 */
export function selectorDefaultFamily<T, Param>(
  options: SelectorDefaultFamilyAdapterParams<T, Param>,
): (param: Param) => T {
  return (param: Param) => options.get(param)({ get: defaultStore.get });
}

/**
 * Adapter for Recoil's asynchronous `selectorFamily`.
 */
export function asyncSelectorFamily<T, Param, U>(
  options: AsyncSelectorFamilyAdapterParams<T, Param, U>,
) {
  const fam = atomFamily(
    (param) =>
      unwrap(
        atom(
          (get: Getter) => options.get(param)({ get }),
          (get: Getter, set: Setter, newValue: SetStateAction<T | U>) => {
            const reset = <Value>(
              atom: AtomAdapter<Value>,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) => set(atom, RESET as any);
            if (options.set) {
              return options.set?.(param)({ get, set, reset }, newValue);
            }
            return;
          },
        ),
        (prev) => prev ?? options.fallback,
      ),
    deepEqual,
  );
  return fam;
}
