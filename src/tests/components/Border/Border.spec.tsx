import React from 'react'
import { render } from '@testing-library/react'
import PokedexBorder from '@components/Border/Border'

describe('PokedexBorder component', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<PokedexBorder />)
    expect(asFragment().childElementCount).toBe(2)
  })
})
