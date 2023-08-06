import React from 'react'
import { it, describe, expect } from 'vitest'
import Image from '@components/Image/Image'
import { render } from '@testing-library/react'

describe('Image component', () => {
  it('should render loading', async () => {
    const { getByTestId } = render(
            <Image alt='any' height={50} width={50} isLoading={true} src='any' key={1} />
    )
    const loading = getByTestId('loading-container')
    expect(loading).toBeInTheDocument()
  })

  it('should render image', async () => {
    const { getByAltText } = render(
      <Image alt='oak' height={50} width={50} isLoading={false} src='oak-professor.png' key={1} />
    )
    const loading = getByAltText('oak')
    expect(loading).toBeInTheDocument()
  })
})
