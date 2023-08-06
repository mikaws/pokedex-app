import { styleCard } from '@utils'
import { describe, expect, it } from 'vitest'

describe('style card', () => {
  it('should return the last selected card', () => {
    expect(styleCard(7, 150, 151, 8)).toMatchObject({ marginLeft: -3, backgroundColor: 'rgb(235, 230, 150)' })
  })
})
