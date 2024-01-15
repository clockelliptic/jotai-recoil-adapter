import { atom, Getter, WritableAtom, SetStateAction, Setter } from "jotai";
import { RESET, atomFamily, unwrap } from "jotai/utils";
import deepEqual from "fast-deep-equal";
import { RecoilGetSelectorFamily, RecoilSetSelectorFamily } from "./types";

export type SelectorFamilyOptions<T, Param> = {
  key: string;
  get: RecoilGetSelectorFamily<Param, T>;
  set?: RecoilSetSelectorFamily<Param, T>;
};

export function selectorFamily<T, Param>(
  options: SelectorFamilyOptions<T, Param>,
) {
  const fam = atomFamily<Param, WritableAtom<T, [SetStateAction<T>], unknown>>(
    (param) => {
      const read = (get: Getter) => options.get(param)({ get });
      const write = (get: Getter, set: Setter, newValue: SetStateAction<T>) => {
        const reset = <Value>(
          atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) => set(atom, RESET as any);
        if (options.set) {
          return options.set?.(param)({ get, set, reset }, newValue);
        }
        return;
      };
      return atom(read, write);
    },
    deepEqual,
  );
  return fam;
}

export type AsyncSelectorFamilyOptionss<T, Param, U> = {
  key: string;
  get: RecoilGetSelectorFamily<Param, Promise<T>>;
  set?: RecoilSetSelectorFamily<Param, T | U>;
  fallback: U;
};

export function asyncSelectorFamily<T, Param, U>(
  options: AsyncSelectorFamilyOptionss<T, Param, U>,
) {
  const fam = atomFamily(
    (param) =>
      unwrap(
        atom(
          (get: Getter) => options.get(param)({ get }),
          (get: Getter, set: Setter, newValue: SetStateAction<T | U>) => {
            const reset = <Value>(
              atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
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
