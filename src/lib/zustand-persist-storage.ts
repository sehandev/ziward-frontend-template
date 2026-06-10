"use client";

import { createStore, del, get, set } from "idb-keyval";
import {
  createJSONStorage,
  type PersistStorage,
  type StateStorage,
} from "zustand/middleware";

const DATABASE_NAME = "ziward-zustand";
const STORE_NAME = "persisted-states";

const store = createStore(DATABASE_NAME, STORE_NAME);

export const zustandIdbStateStorage: StateStorage<Promise<void>> = {
  async getItem(name) {
    return (await get<string>(name, store)) ?? null;
  },
  async setItem(name, value) {
    await set(name, value, store);
  },
  async removeItem(name) {
    await del(name, store);
  },
};

export function createZustandIdbStorage<S>(): PersistStorage<S> {
  const storage = createJSONStorage<S>(() => zustandIdbStateStorage);

  if (!storage) {
    throw new Error("Failed to create Zustand idb-keyval storage.");
  }

  return storage;
}
