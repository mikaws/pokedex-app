import React from 'react'
import styled, { keyframes } from 'styled-components'

const circularMovement = keyframes`
  0%{
    transform:rotate(0deg)
  }
  100%{
    transform:rotate(360deg)
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CircularLoading = styled.div`
  display: inline-block;
  &:after {
    content: '';
    display: block;
    width: 4rem;
    height: 4rem;
    margin: 0.8rem;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${circularMovement} 1.2s linear infinite;
  }
`

const Loading: React.FC = () => {
  return (
    <LoadingContainer data-testid='loading-wrap'>
      <CircularLoading/>
    </LoadingContainer>
  )
}

export default Loading
