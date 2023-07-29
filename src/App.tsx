/* eslint-disable react/no-children-prop */
import React from 'react'
import {
  Routes,
  Route
} from 'react-router-dom'

const Intro = React.lazy(() => import('./pages/Intro'))
const Home = React.lazy(() => import('./pages/Pokedex'))

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<>...</>}>
            <Intro />
          </React.Suspense>
        }
      />

      <Route
        index
        path="/home"
        element={
          <React.Suspense fallback={<>...</>}>
            <Home />
          </React.Suspense>
        }
      />
    </Routes>
  )
}

export default App
