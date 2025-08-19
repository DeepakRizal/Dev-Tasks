// Get item from localStorage
export function getItemFromStorage<T = unknown>(name: string): T | null {
  const item = localStorage.getItem(name);
  if (!item) return null;

  try {
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
}

// Save item to localStorage
export function setItemToStorage<T>(name: string, data: T): void {
  localStorage.setItem(name, JSON.stringify(data));
}
