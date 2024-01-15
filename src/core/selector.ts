import { atom, Getter, SetStateAction, WritableAtom } from "jotai";
import { unwrap } from "jotai/utils";

export type RecoilGet = <T>(
  atom: WritableAtom<T, [SetStateAction<T>], unknown>,
) => T;

export type RecoilSelectorOptions<T> = {
  key: string;
  get: ({ get }: { get: RecoilGet }) => T;
};

export function selector<T>(
  options: RecoilSelectorOptions<T>,
): WritableAtom<T, [], void> {
  return atom(
    (get: Getter) => options.get({ get }),
    () => {
      // TODO: Implement write method
    },
  );
}

export type AsyncRecoilSelectorOptions<T, U> = {
  key: string;
  get: ({ get }: { get: RecoilGet }) => Promise<T>;
  fallback: U;
};

export function asyncSelector<T, U>(options: AsyncRecoilSelectorOptions<T, U>) {
  return unwrap(
    atom(
      (get: Getter) => options.get({ get }),
      () => {
        // TODO: Implement write method
      },
    ),
    (prev) => prev ?? options.fallback,
  );
}
