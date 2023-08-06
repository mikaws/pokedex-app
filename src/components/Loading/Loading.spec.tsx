import React from 'react'
import { render } from '@testing-library/react'
import Loading from '@components/Loading/Loading'
import { it, describe, expect } from 'vitest'

describe('Loading component', () => {
  it('should render correctly loading animation', () => {
    const { getByTestId } = render(<Loading />)
    const loading = getByTestId('loading-container')
    expect(loading).toBeInTheDocument()
  })
})
