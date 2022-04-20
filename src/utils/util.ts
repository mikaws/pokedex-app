interface Range {
  limit: number
  offset: number
}

export const getTypeColor = (type: string): string => {
  switch (type) {
    case 'normal': return '#A8A878'
    case 'fire': return '#F08030'
    case 'fighting': return '#C03028'
    case 'water': return '#6890F0'
    case 'flying': return '#A890F0'
    case 'grass': return '#78C850'
    case 'poison': return '#A040A0'
    case 'electric': return '#F8D030'
    case 'ground': return '#E0C068'
    case 'psychic': return '#F85888'
    case 'rock': return '#B8A038'
    case 'ice': return '#98D8D8'
    case 'bug': return '#A8B820'
    case 'dragon': return '#7038F8'
    case 'ghost': return '#705898'
    case 'dark': return '#705848'
    case 'steel': return '#B8B8D0'
    case 'fairy': return '#EE99AC'

    default: return '#A8A878'
  }
}

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
