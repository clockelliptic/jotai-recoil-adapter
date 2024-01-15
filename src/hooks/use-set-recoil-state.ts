import { WritableAtom, useSetAtom } from "jotai";

export function useSetRecoilState<T>(
  state: WritableAtom<T, [T], unknown>,
): (newValue: T) => void {
  return useSetAtom(state);
}
