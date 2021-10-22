import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components'

const spandAndRotate = keyframes`
  0% {
      transform: rotate(0) scale(0.1);
    }
  100% {
    transform: rotate(360deg) scale(1);
  }
`

const openPokeball = keyframes`
  0% {
    transform: rotate(0) scale(1.1);
  }
  100% {
    transform: rotate(55deg) scale(1.8);
  }
`

const Content = styled.div`
  animation-name: ${props => {
  const isClicked = props.isClicked

  if (isClicked === true) {
    return openPokeball;
  } else {
    return spandAndRotate;
  }
}};
  animation-duration: 1.2s;
  padding: 10px;
  transition: 0.5s;
  transform: ${props => {
    const isClicked = props.isClicked

    if (isClicked === true)
      return "rotate(55deg) scale(1.8)"
    else
      return "none"
  }};

  &:hover {
    transform: ${props => {
      const isClicked = props.isClicked

      if (isClicked === true)
        return "rotate(55deg) scale(1.8)"
      else
        return "scale(1.1)"
    }};
    transition: ${props => {
      const isClicked = props.isClicked

      if (isClicked === true)
        return "none"
      else
        return "0.5s"
    }};
  }
`;

const Pokeball = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
  width: 350px;
  border-radius: 50%;
  background-color: var(--pokeball-inactive);

  &:hover {
    background-color: var(--pokeball-active);
    transition: 2s;
  }
`;

const PokeballLine = styled.div`
  width: 100%;
  height: 8%;
  background-color: var(--background);
  transform: rotate(35deg);
`;

const PokeballButtonOutside = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
  background-color: var(--background);

`;
const PokeballButtonInside = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  border-radius: 50%;
  background-color: var(--pokeball-center-inactive);
  transition: 1s;

  &:hover {
    background-color: var(--pokeball-center-active);
    transition: 0.5s;
  }
`;

function PokeballIntro() {

  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
  }

  return (
    <Content isClicked={isClicked}>
      <Pokeball>
        <PokeballLine />
          <PokeballButtonOutside>
            <PokeballButtonInside
              onClick={() => handleClick()}/>
          </PokeballButtonOutside>
        </Pokeball>
    </Content>
  );
}

export default PokeballIntro;
