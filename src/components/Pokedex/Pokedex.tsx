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
  width: 25em;
  height: 92.5%;
  background: var(--pokeball-inactive);
  background-image: linear-gradient(
    to top left,
    var(--pokeball-center-inactive),
    rgb(159, 83, 197)
  );
  border-radius: 40em 0 0 40em;
  box-shadow: inset 0 0 0.5px 0.2px #3b0ca0;
  margin-left: 3em;
`

const LeftBorderOutline = styled.div`
  width: 35%;
  height: 35%;
  margin: 0 -1px;
  background: var(--background);
  border-radius: 14.5em 0 0 14.5em;
`

const RightBorder = styled.div`
  animation: ${openPokeballToRight} 2s;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 25em;
  height: 92.5%;
  background: var(--pokeball-inactive);
  background-image: linear-gradient(
    to top left,
    var(--pokeball-center-inactive),
    rgb(159, 83, 197)
  );
  border-radius: 0 40em 40em 0;
  box-shadow: inset 0 0 0.5px 0.2px #3b0ca0;
  margin-right: 3em;
`

const RightBorderOutline = styled.div`
  width: 35%;
  height: 35%;
  margin: 0 -1px;
  background: var(--background);
  border-radius: 0 14.5em 14.5em 0;
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
  height: 95%;
  border-radius: 0.8em;
  background: linear-gradient(90deg, #a198e5, #dbacac 80%, #3aaaaa);
  box-shadow: inset 0 0 1px 0.5px #3b0ca0;
  animation: ${displayScreen} 2s;
  margin: 0 1em 0 1em;
  padding: 1em;
  z-index: 1 !important;
  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
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
