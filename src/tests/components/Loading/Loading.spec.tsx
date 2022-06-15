import React from 'react'
import { render } from '@testing-library/react'
import Loading from '@components/Loading/Loading'

describe('Loading component', () => {
  it('should render correctly loading animation', () => {
    const { getByTestId } = render(<Loading />)
    expect(getByTestId('loading-wrap').childElementCount).toBe(1)
  })
})
