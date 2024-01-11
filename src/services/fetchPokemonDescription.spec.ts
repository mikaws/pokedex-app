import { fetchPokemonDescription } from '@services'
import { it, describe, vi, expect } from 'vitest'

const globalRef: any = global

function setupFetchStub (data: any) {
  return function fetchStub (): Promise<any> {
    return new Promise((resolve) => {
      resolve({
        json: () =>
          Promise.resolve(data)
      })
    })
  }
}

function setupFetchErrorStub (data: any) {
  return function fetchStub (): Promise<any> {
    return new Promise((resolve) => {
      resolve({
        json: () => { throw new Error(data) }
      })
    })
  }
}

describe('fetcPokemonDescription function', () => {
  it('Should return a pokemon', async () => {
    const fakeData = {
      egg_groups: [{
        name: 'monster',
        url: 'https://pokeapi.co/api/v2/egg-group/1/'
      }, {
        name: 'plant',
        url: 'https://pokeapi.co/api/v2/egg-group/7/'
      }],
      flavor_text_entries: [{
        flavor_text: 'While it is young, it uses the nutrients that are\nstored in the seed on its back in order to grow.',
        language: {
          name: 'en',
          url: 'https://pokeapi.co/api/v2/language/9/'
        },
        version: {
          name: 'shield',
          url: 'https://pokeapi.co/api/v2/version/34/'
        }
      }]
    }

    globalRef.fetch = vi.fn().mockImplementation(setupFetchStub(fakeData))
    const res = await fetchPokemonDescription(1)
    expect(res).toEqual({
      description: 'Monster Plant Pokémon',
      text: 'While it is young, it uses the nutrients that are\nstored in the seed on its back in order to grow.'
    })
  })

  it('Should return error', async () => {
    globalRef.fetch = vi.fn().mockImplementation(setupFetchErrorStub('invalid'))
    const res = await fetchPokemonDescription(1).catch(err => err.message)
    expect(res).toBe("Couldn't fetch data")
  })
})

export {}
