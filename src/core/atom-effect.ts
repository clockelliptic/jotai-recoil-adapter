import { getDefaultStore } from "jotai";
import { AtomAdapter, EffectFn } from "src/core/types";
import { getLoadable_factory } from "src/core/snapshot-adapter";

/**
 * Use defaultStore from Jotai's Providerless mode to mimick
 * Recoil's atom effects API.
 */
const defaultStore = getDefaultStore();
const getLoadable = getLoadable_factory(defaultStore.get);
export const registerEffects = <T>(
  baseAtom: AtomAdapter<T>,
  effects: EffectFn<T>[],
  initialValueOrFallback: T | undefined,
) => {
  const prevValue: {
    current: T | undefined;
  } = { current: initialValueOrFallback };
  const onSet = (cb: (newVal: T, oldVal?: T) => void) => {
    cb(defaultStore.get(baseAtom), prevValue.current);
  };
  effects.forEach((effect) => {
    defaultStore.sub(baseAtom, () => {
      effect({
        node: baseAtom,
        setSelf: (value: T) => {
          defaultStore.set(baseAtom, value);
        },
        onSet,
        getPromise: async (atom) => defaultStore.get(atom),
        getLoadable,
      });
    });
  });
  // Record prev atom value on each state change *after* effects run
  defaultStore.sub(baseAtom, () => {
    prevValue.current = defaultStore.get(baseAtom);
  });
};
