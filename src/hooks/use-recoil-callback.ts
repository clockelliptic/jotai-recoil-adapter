import { RESET, useAtomCallback } from "jotai/utils";
import { Atom, WritableAtom } from "jotai";
import { useCallback } from "react";

export type UseRecoilCallbackParams = {
  get: <Value>(
    atom: WritableAtom<Value, [Value], unknown>,
  ) => Value | Promise<Value>;
  set: <Value>(
    atom: WritableAtom<Value, [Value], unknown>,
    newValue: Value,
  ) => void;
  reset: <Value>(atom: WritableAtom<Value, [Value], unknown>) => void;
  snapshot: {
    getPromise: <Value>(
      atom: Atom<Value> | WritableAtom<Value, [Value], unknown>,
    ) => Promise<Value>;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRecoilCallback<T extends (...args: any[]) => ReturnType<T>>(
  callback: (params: UseRecoilCallbackParams) => T,
): (...args: Parameters<T>) => ReturnType<T> {
  return useAtomCallback(
    useCallback(
      (get, set, ...args: Parameters<T>) => {
        const wrappedGet = <Value>(
          atom: WritableAtom<Value, [Value], unknown>,
        ) => get(atom);
        const wrappedSet = <Value>(
          atom: WritableAtom<Value, [Value], unknown>,
          newValue: Value,
        ) => set(atom, newValue);
        const wrappedReset = <Value>(
          atom: WritableAtom<Value, [Value], unknown>,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) => set(atom, RESET as any);

        return callback({
          get: wrappedGet,
          set: wrappedSet,
          reset: wrappedReset,
          snapshot: {
            getPromise: async (atom) => get(atom),
          },
        })(...args);
      },
      [callback],
    ),
  );
}
