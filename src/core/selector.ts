import { atom, Getter, Atom } from "jotai";
import { unwrap } from "jotai/utils";

export type RecoilGet = <T>(atom: Atom<T>) => T;
export type RecoilSelectorOptions<T> = {
  key: string;
  get: ({ get }: { get: RecoilGet }) => T;
};

export function selector<T>(options: RecoilSelectorOptions<T>) {
  return atom((get: Getter) => options.get({ get }));
}

export type AsyncRecoilSelectorOptions<T, U> = {
  key: string;
  get: ({ get }: { get: RecoilGet }) => Promise<T>;
  fallback: U;
};

export function asyncSelector<T, U>(options: AsyncRecoilSelectorOptions<T, U>) {
  return unwrap(
    atom((get: Getter) => options.get({ get })),
    (prev) => prev ?? options.fallback,
  );
}
