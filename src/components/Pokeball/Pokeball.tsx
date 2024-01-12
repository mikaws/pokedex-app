import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { PokeballProps, StyleProps } from 'src/@types/Pokeball'

const spandAndRotate = keyframes`
  0% {
      transform: rotate(0) scale(0.1);
    }
  100% {
    transform: rotate(360deg) scale(1);
  }
`

const alignToOpen = keyframes`
  0% {
    transform: rotate(0) scale(1.1);
  }
  100% {
    transform: rotate(55deg) scale(1.8);
  }
`

const Content = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18em;
  height: 18em;
  border-radius: 50%;
  background: linear-gradient(to top left, var(--pokeball-center-inactive), rgb(159, 83, 197));
  box-shadow: inset 0 0 1px 1px var(--background);
  box-shadow: 0 0 1px 1px var(--background);
  animation-duration: 1.2s;
  transition: 0.5s;
  transform: ${props => {
    const isClicked = props.isClicked

    if (isClicked) { return 'rotate(55deg) scale(1.8)' } else { return 'none' }
  }};
  animation-name: ${props => {
    const isClicked = props.isClicked

    if (isClicked) {
      return alignToOpen
    } else {
      return spandAndRotate
    }
  }};

  &:hover {
    background: linear-gradient(to top left, var(--pokeball-center-inactive), rgb(200, 83, 197));
    transform: ${props => {
      const isClicked = props.isClicked

      if (isClicked) { return 'rotate(55deg) scale(1.8)' } else { return 'scale(1.1)' }
    }};
    transition: ${props => {
      const isClicked = props.isClicked

      if (isClicked) { return '1s ease-in' } else { return '0.5s' }
    }};
  }
`

const Line = styled.div`
  position: absolute;
  width: 18.2em;
  height: 2.5em;
  border-top: 50%;
  border-bottom: 50%;
  background-color: var(--background);
  transform: rotate(36deg);
`

const ButtonOutline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8em;
  height: 8em;
  position: absolute;
  border-radius: 50%;
  background-color: var(--background);

`
const Button = styled.div`
  width: 5em;
  height: 5em;
  position: absolute;
  border-radius: 50%;
  background-color: var(--pokeball-center-inactive);
  background-image: linear-gradient(to top left, var(--pokeball-center-inactive), rgb(159, 83, 197));
  transition: 1s;
  cursor: pointer;

  &:hover {
    transition: 0.5s;
    background-color: var(--pokeball-center-active);
    background-image: linear-gradient(to top left, var(--pokeball-center-inactive), rgb(210, 83, 197));
  }
`

const Pokeball: React.FC<PokeballProps> = (props: PokeballProps) => {
  const [isClicked, setIsClicked] = useState(false)
  let awaitRender = false

  const handleClick = (): void => {
    if (!awaitRender) {
      awaitRender = true

      setIsClicked(true)

      setTimeout(() => {
        return props.onClick(true)
      }, 1500)
    }
  }

  return (
    <Content data-testid='pokeball-content' isClicked={isClicked}>
      <Line />
      <ButtonOutline>
        <Button
          data-testid='pokeball-button'
          onClick={() => handleClick()}/>
      </ButtonOutline>
    </Content>
  )
}

export default Pokeball
