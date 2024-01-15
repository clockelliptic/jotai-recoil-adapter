import { useAtomCallback } from "jotai/utils";
import { WritableAtom } from "jotai";
import { useCallback } from "react";

export type UseRecoilCallbackParams = {
  get: <Value>(
    atom: WritableAtom<Value, [Value], unknown>,
  ) => Value | Promise<Value>;
  set: <Value>(
    atom: WritableAtom<Value, [Value], unknown>,
    newValue: Value,
  ) => void;
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

        return callback({ get: wrappedGet, set: wrappedSet })(...args);
      },
      [callback],
    ),
  );
}
