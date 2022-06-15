import { Range } from 'src/@types/Range'

export const getRangeByRegion = (region: string): Range => {
  switch (region) {
    case 'kanto': return { offset: 0, limit: 151 }
    case 'johto': return { offset: 151, limit: 251 }
    case 'hoenn': return { offset: 251, limit: 386 }
    case 'sinnoh': return { offset: 386, limit: 493 }
    case 'unova': return { offset: 493, limit: 649 }
    case 'kalos': return { offset: 649, limit: 721 }
    case 'alola': return { offset: 721, limit: 807 }
    case 'galar': return { offset: 807, limit: 890 }

    default: return { offset: 0, limit: 151 }
  }
}
