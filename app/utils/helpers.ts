export const generateId = (currentItems) =>
  currentItems.length ? Math.max(...currentItems.map((g) => g.id)) + 1 : 1
