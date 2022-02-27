import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyles from './src/styles/GlobalStyles'
import App from './src/App'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
