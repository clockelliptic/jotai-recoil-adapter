import { Atom, useAtom, SetStateAction } from "jotai";

export function useRecoilState<T>(
  recoilState: Atom<T>,
): [T, (newValue: T | SetStateAction<T>) => void] {
  return useAtom(recoilState);
}
