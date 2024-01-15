import { Atom, useAtom } from "jotai";

export function useRecoilState<T>(
  recoilState: Atom<T>,
): [T, (newValue: T) => void] {
  return useAtom(recoilState);
}
