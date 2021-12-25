import { startingId } from "./consts"

export const generateId = (currentItems) =>
  currentItems.length ? Math.max(...currentItems.map((g) => g.id)) + 1 : startingId

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
