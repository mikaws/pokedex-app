import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

jest.mock('./pages/Pokedex.tsx', () => {
  return 'pokedex-mock'
})

describe('App component', () => {
  it('should render without crashing', () => {
    render(<App/>)
  })
})
