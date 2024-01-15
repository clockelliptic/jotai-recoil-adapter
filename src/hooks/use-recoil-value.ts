import { SetStateAction, WritableAtom, useAtomValue } from "jotai";

export function useRecoilValue<T>(
  recoilState: WritableAtom<T, [SetStateAction<T>], unknown>,
): ReturnType<
  typeof useAtomValue<WritableAtom<T, [SetStateAction<T>], unknown>>
> {
  return useAtomValue(recoilState);
}
