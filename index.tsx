import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyles from './src/styles/GlobalStyles'
import App from './src/App'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

const app = (
  <StrictMode>
    <GlobalStyles/>
    <App />
  </StrictMode>
)

root.render(app)
