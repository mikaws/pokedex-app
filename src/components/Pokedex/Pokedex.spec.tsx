import React from 'react'
import { render } from '@testing-library/react'
import Pokedex from '@components/Pokedex/Pokedex'
import { it, describe, expect } from 'vitest'

describe('Pokedex component', () => {
  it('should render Pokedex with children props', () => {
    const { getByTestId } = render(<Pokedex><div data-testid='children'>test</div></Pokedex>)
    const childrenDiv = getByTestId('pokedex-wrapper')
    expect(childrenDiv).toHaveTextContent('test')
  })
})
