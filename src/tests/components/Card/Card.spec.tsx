import React from 'react'
import { render } from '@testing-library/react'
import Card from '@components/Card/Card'
import Loading from '@components/Loading/Loading'

describe('Card component', () => {
  it('should render correctly image', () => {
    const { getByRole, getByTestId } = render(
      <Card>
        <img
          src='https://pokeapi/sprites/pokemon/1.png'
          alt='Pokemon'
          width={95}
          height={95}
        />
      </Card>
    )
    expect(getByTestId('content-wrapper').childElementCount).toBe(1)
    expect(getByRole('img', { name: /pokemon/i })).toBeInTheDocument()
  })

  it('should render correctly Loading component when image is not loaded', () => {
    const { getByTestId } = render(
      <Card>
        <Loading/>
      </Card>
    )
    expect(getByTestId('loading-wrap').childElementCount).toBe(1)
  })
})
