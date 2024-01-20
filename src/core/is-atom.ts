import { WritableAtom } from "jotai";

const writableAtomProps = [
  "init",
  "toString",
  "read",
  "write",
] as (keyof WritableAtom<never, never, never>)[];

export const isMaybePrimitiveAtom = (maybeAtom: unknown): boolean => {
  try {
    const assumedAtom = maybeAtom as WritableAtom<never, never, never>;
    const hasAllProps = writableAtomProps.every(
      (prop) => assumedAtom[prop] !== undefined,
    );
    const isKeyedAsAtom = assumedAtom.toString?.()?.includes("atom");
    if (hasAllProps && isKeyedAsAtom) {
      return true;
    }
  } catch (err) {
    // Probably not an atom.
  }
  return false;
};

const writableDerivedAtomProps = [
  "toString",
  "read",
  "write",
] as (keyof WritableAtom<never, never, never>)[];
export const isMaybeDerivedAtom = (maybeAtom: unknown): boolean => {
  try {
    const assumedAtom = maybeAtom as WritableAtom<never, never, never>;
    const hasAllProps = writableDerivedAtomProps.every(
      (prop) => assumedAtom[prop] !== undefined,
    );
    const isKeyedAsAtom = assumedAtom.toString?.()?.includes("atom");
    const isNotPrimitiveAtom =
      assumedAtom["init" as keyof typeof assumedAtom] === undefined;
    if (isNotPrimitiveAtom && hasAllProps && isKeyedAsAtom) {
      return true;
    }
  } catch (err) {
    // Probably not an atom.
  }
  return false;
};
