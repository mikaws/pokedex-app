import { formatColor } from '@utils'

const pokemonTypes = [
  'normal', 'fire', 'fighting',
  'water', 'flying', 'grass',
  'poison', 'electric', 'ground',
  'psychic', 'rock', 'ice',
  'bug', 'dragon', 'ghost',
  'dark', 'steel', 'fairy',
  'unknown'
]

const pokemonTypeColors = [
  '#A8A878', '#F08030', '#C03028',
  '#6890F0', '#A890F0', '#78C850',
  '#A040A0', '#F8D030', '#E0C068',
  '#F85888', '#B8A038', '#98D8D8',
  '#A8B820', '#7038F8', '#705898',
  '#705848', '#B8B8D0', '#EE99AC',
  '#A8A878'
]

describe('format color util', () => {
  pokemonTypes.forEach((type, i) => {
    it('should to return the correct color', () => {
      expect(formatColor(type)).toBe(pokemonTypeColors[i])
    })
  })
})
