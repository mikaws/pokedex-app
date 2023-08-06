import React from 'react'
import { render } from '@testing-library/react'
import { it, describe, expect, vi } from 'vitest'
import Pokeball from '@components/Pokeball/Pokeball'

const handleClickMock = vi.fn()

describe('Pokedex component', () => {
  it('should render Pokedex with children props', () => {
    const { getByTestId } = render(
      <Pokeball onClick={handleClickMock}/>
    )
    const pokeball = getByTestId('pokeball-content')
    expect(pokeball).toBeInTheDocument()
  })
})
