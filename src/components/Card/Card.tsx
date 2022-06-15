import React from 'react'
import styled from 'styled-components'
import { Props } from 'src/@types/Props'

const CardBorder = styled.div`
  width: 150px;
  padding: 5px;
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
`

const CardBackground = styled.div`
  align-items: center;
  width: 140px;
  height: 140px;
  border-radius: 10px;
  padding: 20px;
  background:
    repeating-linear-gradient( 
      125deg,
      #fea 40%,
      #feaaaa 50%,
      #fea 60%,
      #faa 70%
  );
  border: 1px solid #3c2ca4;
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
