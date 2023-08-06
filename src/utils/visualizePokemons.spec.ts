import { visualizePokemons } from '@utils'
import { it, describe, expect } from 'vitest'

const pokemons = [
  { name: 'bulbasaur', url: 'fake_url_1' },
  { name: 'ivysaur', url: 'fake_url_2' },
  { name: 'venusaur', url: 'fake_url_3' },
  { name: 'charmander', url: 'fake_url_4' },
  { name: 'charmeleon', url: 'fake_url_5' },
  { name: 'charizard', url: 'fake_url_6' },
  { name: 'squirtle', url: 'fake_url_7' },
  { name: 'wartortle', url: 'fake_url_8' },
  { name: 'blastoise', url: 'fake_url_9' },
  { name: 'caterpie', url: 'fake_url_10' },
  { name: 'metapod', url: 'fake_url_11' },
  { name: 'butterfree', url: 'fake_url_12' },
  { name: 'weedle', url: 'fake_url_13' },
  { name: 'kakuna', url: 'fake_url_14' },
  { name: 'beedrill', url: 'fake_url_15' },
  { name: 'pidgey', url: 'fake_url_16' },
  { name: 'pidgeotto', url: 'fake_url_17' },
  { name: 'pidgeot', url: 'fake_url_18' },
  { name: 'rattata', url: 'fake_url_19' },
  { name: 'raticate', url: 'fake_url_20' },
  { name: 'spearow', url: 'fake_url_21' },
  { name: 'fearow', url: 'fake_url_22' },
  { name: 'ekans', url: 'fake_url_23' },
  { name: 'arbok', url: 'fake_url_24' },
  { name: 'pikachu', url: 'fake_url_25' },
  { name: 'raichu', url: 'fake_url_26' },
  { name: 'sandshrew', url: 'fake_url_27' },
  { name: 'sandslash', url: 'fake_url_28' },
  { name: 'nidoran-f', url: 'fake_url_29' },
  { name: 'nidorina', url: 'fake_url_30' }
]

describe('visualize pokemons util', () => {
  it('should to return the 8 pokemons when position is 0', () => {
    expect(visualizePokemons(pokemons, 0)).toStrictEqual(pokemons.slice(0, 8))
  })
  it('should to return the 9 pokemons when position is 1', () => {
    expect(visualizePokemons(pokemons, 1)).toStrictEqual(pokemons.slice(0, 9))
  })
  it('should to return the 16 pokemons when position is 7', () => {
    expect(visualizePokemons(pokemons, 7)).toStrictEqual(pokemons.slice(0, 15))
  })
  it('should to return the range 1 to 16 when position is 8', () => {
    expect(visualizePokemons(pokemons, 8)).toStrictEqual(pokemons.slice(1, 16))
  })
  it('should to return the range 15 to 30 pokemons when position is 22', () => {
    expect(visualizePokemons(pokemons, 22)).toStrictEqual(pokemons.slice(15, 30))
  })
  it('should to return the range 16 to 30 pokemons when position is 23', () => {
    expect(visualizePokemons(pokemons, 23)).toStrictEqual(pokemons.slice(16))
  })
  it('should to return the range 22 to 30  pokemons when position is 29', () => {
    expect(visualizePokemons(pokemons, 29)).toStrictEqual(pokemons.slice(22))
  })
})
