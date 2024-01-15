import { useAtom, SetStateAction, WritableAtom } from "jotai";

export function useRecoilState<T>(
  recoilState: WritableAtom<T, [SetStateAction<T>], unknown>,
): [T, (newValue: T | SetStateAction<T>) => void] {
  return useAtom(recoilState);
}
