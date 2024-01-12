import React from 'react'
import styled from 'styled-components'
import { Props } from 'src/@types/Props'

const CardBorder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13em;
  height: 13em;
  padding: 0.2em;
  border-radius: 10px;
  background:
    repeating-linear-gradient( 
      125deg,
      #1198e0 0%,
      #a198e5 50%,
      #1198e0 80%,
      #a198e5 100%
    );
  border: 1px solid #3b0ca0;
  box-shadow: inset 0 0 0.5px 0.2px #3b0ca0;
  @media (max-width: 400px) {
    width: 8.5em;
    height: 8.5em;
  }
  @media (max-width: 600px) {
    width: 10em;
    height: 10em;
  }
  @media (min-height: 1000px) {
    width: 14em;
    height: 14em;
  }
  @media (min-height: 1200px) {
    width: 16em;
    height: 16em;
  }
`

const CardBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12em;
  height: 12em;
  border-radius: 10px;
  /* padding: 1.5em; */
  background:
    repeating-linear-gradient( 
      125deg,
      #fea 40%,
      #feaaaa 50%,
      #fea 60%,
      #faa 70%
  );
  border: 1px solid #3c2ca4;
  @media (max-width: 400px) {
    width: 8em;
    height: 8em;
  } 
  @media (max-width: 600px) {
    width: 9em;
    height: 9em;
  }
  @media (min-height: 1000px) {
    width: 13em;
    height: 13em;
  }
  @media (min-height: 1200px) {
    width: 15em;
    height: 15em;
  }
`
const Card: React.FC<Props> = ({ children }) => {
  return (
    <CardBorder>
      <CardBackground data-testid='content-wrapper'>
          {children}
      </CardBackground>
    </CardBorder>
  )
}

export default Card
