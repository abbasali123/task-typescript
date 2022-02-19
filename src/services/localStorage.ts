import { localToken } from "../config";

export function updateLocalStorage<TData>(values?: TData) {
  let localData = getLocalStorage();

  localStorage.setItem(
    localToken,
    JSON.stringify({ ...localData, ...(values || {}) })
  );

  return;
}

export function getLocalStorage() {
  return JSON.parse(localStorage.getItem(localToken) || "{}");
}
