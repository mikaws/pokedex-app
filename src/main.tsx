import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyles from '@styles/GlobalStyles'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

const app = (
  <StrictMode>
    <GlobalStyles/>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>
)

root.render(app)
