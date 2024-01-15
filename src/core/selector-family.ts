import { atom, Getter, WritableAtom, SetStateAction } from "jotai";
import { atomFamily, unwrap } from "jotai/utils";
import deepEqual from "fast-deep-equal";

export type SelectorFamilyOptionss<T, Param> = {
  key: string;
  get: (
    param: Param,
  ) => ({
    get,
  }: {
    get: <Value>(
      atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
    ) => Value;
  }) => T;
};

export function selectorFamily<T, Param>(
  options: SelectorFamilyOptionss<T, Param>,
) {
  const fam = atomFamily<Param, WritableAtom<T, [SetStateAction<T>], unknown>>(
    (param) =>
      atom(
        (get: Getter) => options.get(param)({ get }),
        () => {
          // TODO: Implement write method
        },
      ),
    deepEqual,
  );
  return fam;
}

export type AsyncSelectorFamilyOptionss<T, Param, U> = {
  key: string;
  get: (
    param: Param,
  ) => ({
    get,
  }: {
    get: <Value>(
      atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
    ) => Value;
  }) => Promise<T>;
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
          () => {
            // TODO: Implement write method
          },
        ),
        (prev) => prev ?? options.fallback,
      ),
    deepEqual,
  );
  return fam;
}
