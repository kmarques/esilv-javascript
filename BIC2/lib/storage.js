export function getData(key) {
  const dataString = localStorage.getItem(key);
  const data = JSON.parse(dataString) || {};

  return data;
}

export function saveData(key, data) {
  const dataString = JSON.stringify(data);
  localStorage.setItem(key, dataString);
}
