import { RESET, useAtomCallback } from "jotai/utils";
import { Getter, SetStateAction, Setter, WritableAtom } from "jotai";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReactUseCallbackHook = <T extends (...args: any[]) => any>(
  callback: T,
  deps: readonly unknown[],
) => T;

export type UseRecoilCallbackParams = {
  get: <Value>(
    atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
  ) => Value | Promise<Value>;
  set: <Value>(
    atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
    newValue: Value | ((prev: Value) => Value),
  ) => void;
  reset: <Value>(
    atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
  ) => void;
  snapshot: {
    getPromise: <Value>(
      atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
    ) => Promise<Value>;
    retain: () => () => void;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRecoilCallback<T extends (...args: any[]) => ReturnType<T>>(
  useCallback: ReactUseCallbackHook,
  callback: (params: UseRecoilCallbackParams) => T,
  deps?: readonly unknown[],
): (...args: Parameters<T>) => ReturnType<T> {
  const cb = useCallback(
    (get: Getter, set: Setter, ...args: Parameters<T>) => {
      const wrappedGet = <Value>(
        atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
      ) => get(atom);
      const wrappedSet = <Value>(
        atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
        newValue: Value | ((prev: Value) => Value),
      ) => set(atom, newValue);
      const wrappedReset = <Value>(
        atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) => set(atom, RESET as any);

      return callback({
        get: wrappedGet,
        set: wrappedSet,
        reset: wrappedReset,
        snapshot: {
          getPromise: async (atom) => get(atom),
          retain: () => () => {
            // Shim
            return;
          },
        },
      })(...args);
    },
    !deps ? (undefined as unknown as readonly unknown[]) : [...deps],
  );
  return useAtomCallback(cb);
}
