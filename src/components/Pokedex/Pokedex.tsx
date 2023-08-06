import React from 'react'
import { Props } from 'src/@types/Props'
import styled, { keyframes } from 'styled-components'

const openPokeballToLeft = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`

const openPokeballToRight = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`

const PokedexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

const LeftBorder = styled.div`
  animation: ${openPokeballToLeft} 2s;
  display: flex;
  align-items: center;
  justify-content: right;
  width: 25rem;
  height: 30rem;
  background: var(--pokeball-inactive);
  background-image: linear-gradient(
    to top left,
    var(--pokeball-center-inactive),
    rgb(159, 83, 197)
  );
  border-radius: 40rem 0 0 40rem;
  box-shadow: inset 0 0 0.5px 0.2px #3b0ca0;
  margin-left: 3rem;
`

const LeftBorderOutline = styled.div`
  width: 35%;
  height: 35%;
  margin: 0 -1px;
  background: var(--background);
  border-radius: 14.5rem 0 0 14.5rem;
`

const RightBorder = styled.div`
  animation: ${openPokeballToRight} 2s;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 25rem;
  height: 30rem;
  background: var(--pokeball-inactive);
  background-image: linear-gradient(
    to top left,
    var(--pokeball-center-inactive),
    rgb(159, 83, 197)
  );
  border-radius: 0 40rem 40rem 0;
  box-shadow: inset 0 0 0.5px 0.2px #3b0ca0;
  margin-right: 3rem;
`

const RightBorderOutline = styled.div`
  width: 35%;
  height: 35%;
  margin: 0 -1px;
  background: var(--background);
  border-radius: 0 14.5rem 14.5rem 0;
`

const displayScreen = keyframes`
  0% {
    padding: 0;
    opacity: 0;
  }
  100% {
    border-radius: 10px;
    opacity: 1;
  }
`

const Screen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30rem;
  border-radius: 0.8rem;
  background: linear-gradient(90deg, #a198e5, #dbacac 80%, #3aaaaa);
  box-shadow: inset 0 0 1px 0.5px #3b0ca0;
  animation: ${displayScreen} 2s;
  margin: 0 1rem 0 1rem;
  z-index: 1 !important;
`

interface PokedexProps extends Props {
  primaryColor?: string
  secondaryColor?: string
}

const Pokedex: React.FC<PokedexProps> = ({
  children,
  primaryColor,
  secondaryColor
}) => {
  return (
    <PokedexWrapper data-testid="pokedex-wrapper">
      <LeftBorder>
        <LeftBorderOutline />
      </LeftBorder>
      <Screen
        data-testid="pokedex-screen"
        style={{
          background: `linear-gradient(${primaryColor ?? ''}, ${
            secondaryColor ?? ''
          })`
        }}
      >
        {children}
      </Screen>
      <RightBorder>
        <RightBorderOutline />
      </RightBorder>
    </PokedexWrapper>
  )
}

export default Pokedex
