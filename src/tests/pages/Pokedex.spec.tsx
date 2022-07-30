import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Pokedex from '../../pages/Pokedex'
import { fetchPokemons, fetchTargetPokemon } from '@services'

jest.mock('@services/fetchPokemons.ts', () => ({
  __esModule: true,
  fetchPokemons: jest.fn().mockImplementation(() => {
    return [{ name: 'bulbasaur', url: 'bulbasaur-url' }]
  })
}))

jest.mock('@services/fetchTargetPokemon.ts', () => ({
  __esModule: true,
  fetchTargetPokemon: jest.fn().mockImplementation(() => {
    return {
      image: 'pokemon-image',
      types: {
        firstType: 'grass',
        secondType: 'poison'
      }
    }
  })
}))

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

describe('Pokedex page', () => {
  it('should render the pokedex when button is clicked', async () => {
    const { getByTestId, findByTestId } = render(
      <Pokedex/>
    )

    fireEvent.click(getByTestId('pokeball-button'))
    expect(await findByTestId('pokedex-wrap', {}, { timeout: 2000 })).toBeInTheDocument()
  })
  it('should render pokemon image', async () => {
    const { getByTestId, findByTestId, getByAltText } = render(
      <Pokedex />
    )

    fireEvent.click(getByTestId('pokeball-button'))
    expect(await findByTestId('pokedex-wrap', {}, { timeout: 2000 })).toBeInTheDocument()

    const image = getByAltText('Pokemon')
    fireEvent.load(image)
  })
  it('should render loading', async () => {
    const { getByTestId, findByTestId, rerender, findByAltText } = render(
      <Pokedex />
    )

    fireEvent.click(getByTestId('pokeball-button'))
    await findByTestId('pokedex-wrap', {}, { timeout: 2000 })

    expect(await findByTestId('loading-wrap', {}, { timeout: 1000 })).toBeInTheDocument()

    fireEvent.keyDown(getByTestId('pokedex-wrap'), { key: 'keyUp' })
    fireEvent.keyDown(getByTestId('pokedex-wrap'), { key: 'keyDown' })
    rerender(<Pokedex />)
    expect(await findByAltText('Pokemon', {}, { timeout: 1000 })).toHaveStyle('display: none')
  })

  it('should catch fetchPokemons error', async () => {
    jest.unmock('../../services/fetchPokemons.ts');
    (fetchPokemons as jest.Mock).mockImplementation(() => {
      throw new Error('error')
    })
    let messageError
    try {
      fetchPokemons('any')
    } catch (error) {
      messageError = error.message
    }
    const expectedError = 'error'

    expect(messageError).toEqual(expectedError)

    const { getByTestId, findByTestId } = render(
      <Pokedex />
    )

    fireEvent.click(getByTestId('pokeball-button'))
    expect(await findByTestId('pokedex-wrap', {}, { timeout: 2000 })).toBeInTheDocument()
  })

  it('should catch fetchTargetPokemons error', async () => {
    jest.unmock('../../services/fetchTargetPokemon.ts');
    (fetchTargetPokemon as jest.Mock).mockImplementation(() => {
      throw new Error('error')
    })
    let messageError
    try {
      fetchTargetPokemon(-1)
    } catch (error) {
      messageError = error.message
    }
    const expectedError = 'error'

    expect(messageError).toEqual(expectedError)

    const { getByTestId, findByTestId } = render(
      <Pokedex />
    )

    fireEvent.click(getByTestId('pokeball-button'))
    expect(await findByTestId('pokedex-wrap', {}, { timeout: 2000 })).toBeInTheDocument()
  })
})
