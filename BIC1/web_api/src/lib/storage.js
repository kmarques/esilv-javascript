let STORAGE_KEY = null;

export function setStorageKey(key) {
  STORAGE_KEY = key;
}

export function getData(defaultData) {
  const dataString = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(dataString) || defaultData || [];
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
