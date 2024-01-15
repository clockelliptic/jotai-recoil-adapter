import { atom, Getter, SetStateAction, Setter, WritableAtom } from "jotai";
import { RESET, unwrap } from "jotai/utils";
import { RecoilGetSelector, RecoilSetSelector } from "./types";

export type RecoilSelectorOptions<T> = {
  key: string;
  get: RecoilGetSelector<T>;
  set?: RecoilSetSelector<T>;
};

export function selector<T>(
  options: RecoilSelectorOptions<T>,
): WritableAtom<T, [SetStateAction<T>], void> {
  return atom(
    (get: Getter) => options.get({ get }),
    (get: Getter, set: Setter, newValue: SetStateAction<T>) => {
      const reset = <Value>(
        atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) => set(atom, RESET as any);
      if (options.set) {
        return options.set?.({ get, set, reset }, newValue);
      }
      return;
    },
  );
}

export type AsyncRecoilSelectorOptions<T, U> = {
  key: string;
  get: RecoilGetSelector<Promise<T | U>>;
  set?: RecoilSetSelector<T | U>;
  fallback: U;
};

export function asyncSelector<T, U>(options: AsyncRecoilSelectorOptions<T, U>) {
  return unwrap(
    atom(
      (get: Getter) => options.get({ get }),
      (get: Getter, set: Setter, newValue: SetStateAction<T | U>) => {
        const reset = <Value>(
          atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
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
