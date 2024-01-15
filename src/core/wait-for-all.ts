import { SetStateAction, WritableAtom, atom } from "jotai";

/**
 * WARNING: Must be wrapped with useMemo or useRef if used inside of render function.
 *
 * see: https://jotai.org/docs/core/atom#note-about-creating-an-atom-in-render-function
 */
export function waitForAll<T>(
  selectors: WritableAtom<T, [SetStateAction<T>], unknown>[],
) {
  return atom(
    (get) => Promise.all(selectors.map(get)),
    () => {
      // Type shim
    },
  );
}
