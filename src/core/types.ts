import { SetStateAction, WritableAtom } from "jotai";

export type RecoilGetSelector<T> = ({
  get,
}: {
  get: <Value>(
    atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
  ) => Value;
}) => T;

export type RecoilSetSelector<T> = (
  params: {
    get: <Value>(
      atom: WritableAtom<Value, [SetStateAction<Value>], void>,
    ) => Value;
    set: <Value>(
      atom: WritableAtom<Value, [SetStateAction<Value>], void>,
      update: SetStateAction<Value>,
    ) => void;
    reset: <Value>(
      atom: WritableAtom<Value, [SetStateAction<Value>], void>,
    ) => void;
  },
  newValue: SetStateAction<T>,
) => void;

