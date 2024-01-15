import { SetStateAction, useSetAtom, WritableAtom } from "jotai";
import { RESET } from "jotai/utils";

export function useResetRecoilState<T>(
  state: WritableAtom<T, [SetStateAction<T>], unknown>,
): () => void {
  const set = useSetAtom(state);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return () => set(RESET as any);
}
