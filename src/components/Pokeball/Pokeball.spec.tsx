import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { it, describe, vi, expect } from 'vitest'
import Pokeball from '@components/Pokeball/Pokeball'

vi.useFakeTimers()
vi.spyOn(global, 'setTimeout')
const handleClickMock = vi.fn()

describe('Pokeball component', () => {
  it('should update props when button is clicked', async () => {
    const { getByTestId } = render(
      <Pokeball onClick={handleClickMock}/>
    )
    expect(handleClickMock).not.toBeCalled()

    fireEvent.click(getByTestId('pokeball-button'))
    vi.runAllTimers()

    expect(handleClickMock).toHaveBeenCalledTimes(1)
  })
})
