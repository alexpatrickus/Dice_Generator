export const DIE_TYPES = [4, 6, 8, 10, 12, 20]
export const MAX_DICE_PER_TYPE = 20

export const EMPTY_COUNTS = Object.fromEntries(DIE_TYPES.map((sides) => [sides, 0]))

let sequence = 0

function nextId() {
  sequence += 1
  return `${Date.now().toString(36)}-${sequence}`
}

export function clampCount(count) {
  const value = Number.isFinite(count) ? Math.floor(count) : 0
  return Math.min(MAX_DICE_PER_TYPE, Math.max(0, value))
}

export function rollDie(sides, random = Math.random) {
  if (!DIE_TYPES.includes(sides)) {
    throw new Error(`Unsupported die: ${sides}`)
  }
  return Math.floor(random() * sides) + 1
}

const LOWER_DICE_MAX_SIDES = 10

/** @returns {'low' | 'mid' | 'high'} */
export function rollValueTone(value, sides) {
  if (!Number.isFinite(value) || !DIE_TYPES.includes(sides)) return 'mid'
  if (value === 1 && sides <= LOWER_DICE_MAX_SIDES) return 'low'
  const ratio = value / sides
  if (ratio <= 0.1) return 'low'
  if (ratio >= 0.9) return 'high'
  return 'mid'
}

export function singleTypeCounts(sides) {
  return { ...EMPTY_COUNTS, [sides]: 1 }
}

export function totalDice(counts) {
  return DIE_TYPES.reduce((sum, sides) => sum + clampCount(counts?.[sides] ?? 0), 0)
}

export function rollSelection(counts, options = {}) {
  const random = options.random ?? Math.random
  const now = options.now ?? Date.now
  const id = options.id ?? nextId

  const dice = []
  const sums = Object.fromEntries(DIE_TYPES.map((sides) => [sides, 0]))

  for (const sides of DIE_TYPES) {
    const count = clampCount(counts?.[sides] ?? 0)
    for (let index = 0; index < count; index += 1) {
      const value = rollDie(sides, random)
      dice.push({ id: id(), sides, value })
      sums[sides] += value
    }
  }

  const total = dice.reduce((sum, die) => sum + die.value, 0)
  return { id: id(), timestamp: now(), dice, sums, total }
}