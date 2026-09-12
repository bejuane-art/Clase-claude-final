import { describe, expect, it } from 'vitest'
import { PEOPLE, TAGS, createSeedColumns } from './seedData'

describe('seedData', () => {
  it('every seed column has at least one card', () => {
    const columns = createSeedColumns()
    expect(columns).toHaveLength(4)
    for (const column of columns) {
      expect(column.cards.length).toBeGreaterThan(0)
    }
  })

  it('covers every tag category across the seed cards', () => {
    const columns = createSeedColumns()
    const usedTags = new Set(columns.flatMap((c) => c.cards.map((card) => card.tag)))
    expect(usedTags).toEqual(new Set(Object.keys(TAGS)))
  })

  it('covers every person across the seed cards', () => {
    const columns = createSeedColumns()
    const usedPeople = new Set(columns.flatMap((c) => c.cards.map((card) => card.who)))
    expect(usedPeople).toEqual(new Set(PEOPLE.map((p) => p.ini)))
  })

  it('assigns unique ids to every card', () => {
    const columns = createSeedColumns()
    const ids = columns.flatMap((c) => c.cards.map((card) => card.id))
    expect(new Set(ids).size).toBe(ids.length)
  })
})
