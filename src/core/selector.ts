import { atom, getDefaultStore, Getter, SetStateAction, Setter } from "jotai";
import { RESET, unwrap } from "jotai/utils";
import {
  AsyncSelectorAdapterParams,
  AtomAdapter,
  SelectorAdapterParams,
  SelectorDefaultAdapterParams,
} from "src/core/types";

/**
 * Adapter for Recoil's standard synchronous `selector`.
 *
 * Note: for async selectors, use `import { asyncSelector } from 'jotai-recoil-adapter'`
 */
export function selector<T>(options: SelectorAdapterParams<T>) {
  return atom(
    (get: Getter) => options.get({ get }),
    (get: Getter, set: Setter, newValue: SetStateAction<T>) => {
      const reset = <Value>(
        atom: AtomAdapter<Value>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) => set(atom, RESET as any);
      if (options.set) {
        return options.set?.({ get, set, reset }, newValue);
      }
      return;
    },
  );
}

const defaultStore = getDefaultStore();
/**
 * Special adapter for both synchronous and asynchronous Recoil `selector` that
 * are used to initialize recoil `atom`.
 *
 * WARNING: Depends on Jotai's getDefaultStore() method.
 * Only works in Jotai Providerless mode.
 */
export function selectorDefault<T>(
  options: SelectorDefaultAdapterParams<T>,
): T {
  return options.get({ get: defaultStore.get });
}

/**
 * Adapter for Recoil's asynchronous `selector`.
 */
export function asyncSelector<T, U>(options: AsyncSelectorAdapterParams<T, U>) {
  return unwrap(
    atom(
      (get: Getter) => options.get({ get }),
      (get: Getter, set: Setter, newValue: SetStateAction<T | U>) => {
        const reset = <Value>(
          atom: AtomAdapter<Value>,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) => set(atom, RESET as any);
        if (options.set) {
          return options.set?.({ get, set, reset }, newValue);
        }
        return;
      },
    ),
    (prev) => prev ?? options.fallback,
  );
}
