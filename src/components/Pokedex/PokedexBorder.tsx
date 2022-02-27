import React from 'react'
import styled, { keyframes } from 'styled-components'

const openPokeballToLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-500px);
  }
`

const openPokeballToRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(500px);
  }
`

const LeftBorder = styled.div`
  animation: ${openPokeballToLeft} 2s;
  transform:  translateX(-500px);
  display: flex;
  align-items: center;
  justify-content: right;
  float: left;
  width: 315px;
  height: 643px;
  margin: 0 30px;
  background: var(--pokeball-inactive);
  background-image: linear-gradient(to top left, var(--pokeball-center-inactive), rgb(159, 83, 197));
  border-radius: 630px 0 0 630px;
  box-shadow: inset 0 0 0.5px 0.2px #3b0ca0;
`;

const RightBorder = styled.div`
  animation: ${openPokeballToRight} 2s;
  transform:  translateX(500px);
  display: flex;
  align-items: center;
  justify-content: left;
  float: right;
  width: 315px;
  height: 643px;
  margin: 0 30px;
  background: var(--pokeball-inactive);
  background-image: linear-gradient(to top right, var(--pokeball-center-inactive), rgb(159, 83, 197));
  border-radius: 0 630px 630px 0;
  box-shadow: inset 0 0 0.5px 0.2px #3b0ca0;
`;

const LeftBorderOutline = styled.div`
  float: left;
  width: 100px;
  height: 230px;
  margin: 0 -1px;
  background: var(--background);
  border-radius: 230px 0 0 230px;
`;

const RightBorderOutline = styled.div`
  float: right;
  width: 100px;
  height: 230px;
  margin: 0 -1px;
  background: var(--background);
  border-radius: 0 230px 230px 0;
`;

const PokedexBorder: React.FC = () => {
  return (
    <>
      <LeftBorder>
        <LeftBorderOutline/>
      </LeftBorder>
      <RightBorder>
        <RightBorderOutline/>
      </RightBorder>
    </>
  );
}

export default PokedexBorder;
