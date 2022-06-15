import { getRangeByRegion } from '@utils'

const regions = [
  'kanto', 'johto', 'hoenn',
  'sinnoh', 'unova', 'kalos',
  'alola', 'galar', 'unknown'
]

const ranges = [
  { offset: 0, limit: 151 },
  { offset: 151, limit: 251 },
  { offset: 251, limit: 386 },
  { offset: 386, limit: 493 },
  { offset: 493, limit: 649 },
  { offset: 649, limit: 721 },
  { offset: 721, limit: 807 },
  { offset: 807, limit: 890 },
  { offset: 0, limit: 151 }
]

describe('format color util', () => {
  regions.forEach((region, i) => {
    it('should to return the correct range', () => {
      expect(getRangeByRegion(region)).toStrictEqual(ranges[i])
    })
  })
})
