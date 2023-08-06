import React from 'react'
import { render } from '@testing-library/react'
import Card from '@components/Card/Card'
import { it, describe, expect } from 'vitest'

describe('Card component', () => {
  it('should render correctly the children img', () => {
    const { getByRole, getByTestId } = render(
      <Card>
        <img
          src='oak-professor.png'
          alt='oak'
          width={95}
          height={95}
        />
      </Card>
    )
    expect(getByTestId('content-wrapper').childElementCount).toBe(1)
    expect(getByRole('img', { name: 'oak' })).toBeInTheDocument()
  })
})
