import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

interface StyleProps {
  isClicked: boolean
}

interface Props {
  onClick: (click: boolean) => void
}

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
  height: 350px;
  width: 350px;
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
  width: 110%;
  height: 40px;
  background-color: var(--background);
  transform: rotate(36deg);
`

const ButtonOutline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
  background-color: var(--background);

`
const Button = styled.div`
  width: 100px;
  height: 100px;
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

const Pokeball: React.FC<Props> = (props: Props) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = async (): Promise<void> => {
    setIsClicked(!isClicked)
    setTimeout(() => {
      return props.onClick(isClicked)
    }, 1500)
  }

  return (
      <Content data-testid='pokeball-wrap' isClicked={isClicked}>
        <Line />
        <ButtonOutline>
          <Button
            data-testid='pokeball-button'
            onClick={async () => await handleClick()}/>
        </ButtonOutline>
      </Content>
  )
}

export default Pokeball
