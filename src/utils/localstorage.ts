export function getItemFromStorage(name: string) {
  const data = JSON.parse(localStorage.getItem(name) || "{}");
  return data;
}
