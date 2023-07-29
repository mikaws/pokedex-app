import React from 'react'
import { render, fireEvent, waitFor, findByAltText } from '@testing-library/react'
import Pokedex from '@pages/Pokedex'
import { it, describe, vi, beforeEach, expect, afterEach, Mock } from 'vitest'
import { fetchTargetPokemon } from '../../services/fetchTargetPokemon'

const pokes: Array<{ name: string, url: string }> = []

for (let i = 1; i <= 256; i++) {
  pokes.push({
    name: `pokemon${i}`,
    url: `pokemon-url${i}`
  })
}

// const doneLoading = (): void => {
//   let loadtime = new Date().getTime() - 1000
// }
vi.mock('../../services/fetchPokemons.ts', () => ({
  __esModule: true,
  fetchPokemons: vi.fn().mockImplementation(() => {
    return pokes
  })
}))
vi.mock('../../services/fetchTargetPokemon.ts', () => ({
  __esModule: true,
  fetchTargetPokemon: vi.fn().mockImplementation(() => {
    return {
      image: 'pokemon-image',
      types: {
        firstType: 'type1'
      }
    }
  })
}))

beforeEach(() => {
  vi.resetModules()
  vi.useFakeTimers()
})

afterEach(() => {
  vi.clearAllTimers()
})

describe('Pokedex page', () => {
  it('should test if 8 pokemons are rendered when loading the page and 9 when key ArrowDown is press', async () => {
    // todo: break into 2 tests
    const { findAllByTestId, getByTestId, findByTestId } = render(
      <Pokedex />
    )

    const loading = getByTestId('loading-wrap')
    expect(loading).toBeInTheDocument()

    const pokedexWrap = await findByTestId('pokedex-wrap')
    fireEvent.keyDown(pokedexWrap, { key: 'ArrowUp' })
    vi.runAllTimers()
    const image = await findByAltText(pokedexWrap, 'Pokemon')
    fireEvent.load(image)
    expect(image).toHaveStyle({ display: 'inline-block' })
    await waitFor(async () => {
      const textCards = await findAllByTestId(/text-card/)
      expect(loading).not.toBeInTheDocument()
      expect(textCards.length).toBe(8)
    })

    fireEvent.keyDown(pokedexWrap, { key: 'ArrowDown' })
    vi.runAllTimers()
    await waitFor(async () => {
      const textCards = await findAllByTestId(/text-card/)
      expect(textCards.length).toBe(9)
    })

    fireEvent.keyDown(pokedexWrap, { key: 'ArrowUp' })
    vi.runAllTimers()
    await waitFor(async () => {
      const textCards = await findAllByTestId(/text-card/)
      expect(textCards.length).toBe(8)
    })
  })
  it('should test if error is showing on screen', async () => {
    (fetchTargetPokemon as Mock).mockImplementation(() => {
      throw Error('any')
    })
    const { getByTestId } = render(<Pokedex />)

    const errorDiv = getByTestId('error')
    expect(errorDiv).toBeInTheDocument()
  })
})
