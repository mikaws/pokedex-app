import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Home from '@pages/Home'
import { it, describe, vi, beforeEach, expect, afterEach } from 'vitest'
import * as Service from '@services'

const pokes: Array<{ name: string, url: string }> = []

for (let i = 1; i <= 256; i++) {
  pokes.push({
    name: `pokemon${i}`,
    url: `pokemon-url${i}`
  })
}
const pokeData = {
  image: 'oak-professor.png',
  types: {
    firstType: 'neutral',
    secondType: 'neutral'
  }
}

describe('Home page', () => {
  beforeEach(() => {
    vi.mock('../services/fetchPokemons.ts', () => ({
      __esModule: true,
      fetchPokemons: vi.fn().mockResolvedValue(() => {
        return new Promise((resolve) => {
          resolve({
            json: () => Promise.resolve(pokes)
          })
        })
      })
    }))
    vi.mock('../services/fetchTargetPokemon.ts', () => ({
      __esModule: true,
      fetchTargetPokemon: vi.fn().mockResolvedValue(() => {
        return new Promise((resolve) => {
          resolve({
            json: () => Promise.resolve(pokeData)
          })
        })
      })
    }))
    vi.mock('../services/fetchTargetDescription.ts', () => ({
      __esModule: true,
      fetchTargetPokemon: vi.fn().mockResolvedValue(() => {
        return new Promise((resolve) => {
          resolve({
            json: () => Promise.resolve(pokeData)
          })
        })
      })
    }))
    global.fetch = vi.fn().mockResolvedValue(
      new Promise((resolve) => {
        resolve({
          json: () =>
            Promise.resolve({
              results: pokes,
              sprites: { front_default: 'pokemon-image' },
              types: [{ type: { name: 'neutral' } }, { type: { name: 'neutral' } }],
              description: 'Monster Plant Pokémon',
              text: 'While it is young, it uses the nutrients that are\nstored in the seed on its back in order to grow.'
            })
        })
      })
    )
    vi.resetModules()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.resetAllMocks()
    vi.clearAllTimers()
  })

  it('should test if 8 pokemons are rendered when loading the page and 9 when key ArrowDown is press', async () => {
    const { findByAltText, getByTestId, findByTestId, findAllByTestId } =
      render(<Home />)
    const loading = getByTestId('loading-container')
    expect(loading).toBeInTheDocument()
    const pokedexWrapper = await findByTestId('pokedex-wrapper')
    fireEvent.keyDown(pokedexWrapper, { key: 'ArrowUp' })
    vi.runAllTimers()
    await waitFor(async () => {
      const image = await findByAltText(/pokemon/)
      expect(image).toHaveStyle({ display: 'inline-block' })
      fireEvent.load(image)
      const textCards = await findAllByTestId(/text-item/)
      expect(textCards.length).toBe(8)
      const screen = await findByTestId(/pokedex-screen/)
      expect(screen).toHaveStyle({ backgroundColor: 'linear-gradient(#A8A878, #A8A878)' })
      const pokemonInfo = await findByTestId(/pokemon-info/)
      expect(pokemonInfo).toBe('')
    })
    fireEvent.keyDown(pokedexWrapper, { key: 'ArrowDown' })
    vi.runAllTimers()
    await waitFor(async () => {
      const textCards = await findAllByTestId(/text-item/)
      expect(textCards.length).toBe(9)
    })
    fireEvent.keyDown(pokedexWrapper, { key: 'ArrowUp' })
    vi.spyOn(Service, 'fetchTargetPokemon').mockResolvedValue({
      image: 'oak-professor.png',
      types: {
        firstType: 'grass'
      }
    })
    vi.runAllTimers()
    await waitFor(async () => {
      const textCards = await findAllByTestId(/text-item/)
      expect(textCards.length).toBe(8)
      const screen = await findByTestId(/pokedex-screen/)
      expect(screen).toHaveStyle({ backgroundColor: 'linear-gradient(#78C850, #A8A878)' })
    })
  })

  it('should test if error is showing on screen when not fetching the pokemons', async () => {
    global.fetch = vi.fn().mockResolvedValue(new Error('Failed to fetch'))
    const { findByText } = render(<Home />)
    vi.spyOn(Service, 'fetchTargetPokemon').mockResolvedValue(new Error('Failed to fetch'))
    const textCard = await findByText(
      /Error! There is a unknown psychic power/i
    )
    expect(textCard).toBeInTheDocument()
  })

  it('should test if error is showing on screen when not fetching the pokemons', async () => {
    global.fetch = vi.fn().mockResolvedValue(new Error('Failed to fetch'))
    const { findByText } = render(<Home />)
    vi.spyOn(Service, 'fetchPokemons').mockResolvedValue(new Error('Failed to fetch'))
    const textCard = await findByText(
      /Error! There is a unknown psychic power/i
    )
    expect(textCard).toBeInTheDocument()
  })
})
