export const generateId = (currentItems) =>
  currentItems.length ? Math.max(...currentItems.map((g) => g.id)) + 1 : 1

export const generateOrder = (currentItems) =>
  currentItems.length ? Math.max(...currentItems.map((g) => g.order)) + 1 : 1
