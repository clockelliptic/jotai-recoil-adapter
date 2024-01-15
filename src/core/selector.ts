import { atom, Getter, Atom } from "jotai";

export type RecoilGet = <T>(atom: Atom<T>) => T;
export type RecoilSelectorOptions<T> = {
  key: string;
  get: ({ get }: { get: RecoilGet }) => T;
};

export function selector<T>(options: RecoilSelectorOptions<T>) {
  return atom((get: Getter) => options.get({ get }));
}
