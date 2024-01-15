import { SetStateAction, WritableAtom, useSetAtom } from "jotai";

export function useSetRecoilState<T>(
  state: WritableAtom<T, [SetStateAction<T>], unknown>,
): (newValue: T | ((prev: T) => T)) => void {
  return useSetAtom(state);
}
