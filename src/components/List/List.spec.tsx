import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { it, describe, expect, afterEach } from 'vitest'
import List from './List'

const pokes: Array<{ name: string, url: string }> = []
for (let i = 1; i <= 256; i++) {
  pokes.push({
    name: `pokemon${i}`,
    url: `pokemon-url${i}`
  })
}

describe('List component', () => {
  afterEach(cleanup)

  it('should test if 8 pokemons are rendered on the start of the list', () => {
    const { getByTestId } = render(
      <List items={pokes.slice(0, 8)} actualPosition={0} lastPosition={256} />
    )

    const list = getByTestId('ordered-list')
    expect(list).toHaveStyle({ 'align-self': 'flex-end' })
  })

  it('should test if 8 pokemons are rendered on the final of the list', () => {
    const { getByTestId } = render(
      <List
        items={pokes.slice(pokes.length - 8, pokes.length)}
        actualPosition={252}
        lastPosition={256}
      />
    )

    const list = getByTestId('ordered-list')
    expect(list).toHaveStyle({ 'align-self': 'flex-start' })
  })
})
