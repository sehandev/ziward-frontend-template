"use client";

import {
  persist as createPersistMiddleware,
  type PersistOptions,
} from "zustand/middleware";
import type { StateCreator, StoreMutatorIdentifier } from "zustand/vanilla";
import { createZustandIdbStorage } from "@/lib/zustand-persist-storage";

export type { StoreApi, UseBoundStore } from "zustand";
export { create, useStore } from "zustand";
export type { PersistOptions, StateStorage } from "zustand/middleware";
export { createStore } from "zustand/vanilla";

type PersistWithIdbOptions<T, U> = Omit<PersistOptions<T, U>, "storage"> &
  Partial<Pick<PersistOptions<T, U>, "storage">>;

export function persist<
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
  U = T,
>(
  initializer: StateCreator<T, [...Mps, ["zustand/persist", unknown]], Mcs>,
  options: PersistWithIdbOptions<T, U>,
): StateCreator<T, Mps, [["zustand/persist", U], ...Mcs]> {
  return createPersistMiddleware(initializer, {
    storage: createZustandIdbStorage<U>(),
    ...options,
  });
}
