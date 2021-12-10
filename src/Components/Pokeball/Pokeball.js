import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components'
import fetchKantoPokemon from '../../fetch';

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

const displayScreen = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Content = styled.div`
  animation-name: ${props => {
    const isClicked = props.isClicked

    if (isClicked === true) {
      return alignToOpen;
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

const HalfLeftCircle = styled.div`
  animation: ${openPokeballToLeft} 2s;
  transform:  translateX(-500px);
  display: flex;
  align-items: center;
  justify-content: right;
  float: left;
  width: 315px;
  height: 630px;
  margin: 0 30px;
  background: var(--pokeball-inactive);
  border-radius: 630px 0 0 630px;
`;

const HalfRightCircle = styled.div`
  animation: ${openPokeballToRight} 2s;
  transform:  translateX(500px);
  display: flex;
  align-items: center;
  justify-content: left;
  float: right;
  width: 315px;
  height: 630px;
  margin: 0 30px;
  background: var(--pokeball-inactive);
  border-radius: 0 630px 630px 0;
`;

const HalfLeftInsideCircle = styled.div`
  float: left;
  width: 100px;
  height: 230px;
  margin: 0 -1px;
  background: var(--background);
  border-radius: 230px 0 0 230px;
`;

const HalfRightInsideCircle = styled.div`
  float: right;
  width: 100px;
  height: 230px;
  margin: 0 -1px;
  background: var(--background);
  border-radius: 0 230px 230px 0;
`;

const PokedexContainer = styled.div` 
  position: absolute;
  margin: 0 -125px;
  width: 1000px;
  height: 630px;
  background: rgb(59, 172, 172);
  animation: ${displayScreen} 5s;
  overflow-y: hidden;
`

function PokeballIntro() {

  const [isClicked, setIsClicked] = useState(false)
  const [isExpand, setIsExpand] = useState(false)
  const [pokemonList, setPokemonList] = useState([])

  const handleClick = () => {
    setIsClicked(true)
  }

  const fetchData = async () => {
    const res = await fetchKantoPokemon()
    setPokemonList(res.results)
  }

  useEffect(() => {
    if(isClicked){
      setTimeout(() => setIsExpand(true), 2000)
      fetchData()
    }
  }, [isClicked])
  
  return (
      <>
        {isExpand 
          ? <>
              <HalfLeftCircle>
                <HalfLeftInsideCircle/>
              </HalfLeftCircle>
              <HalfRightCircle>
                <HalfRightInsideCircle/>
              </HalfRightCircle>
              <PokedexContainer>
                {pokemonList.map((pokemon,i) => (
                   <div key={pokemon.name}>
                    <h6>{pokemon.name}</h6>
                   </div>
                ))}
              </PokedexContainer> 
            </>
          : <Content isClicked={isClicked}>
              <Pokeball>
              <PokeballLine />
                <PokeballButtonOutside>
                  <PokeballButtonInside
                    onClick={() => handleClick()}/>
                </PokeballButtonOutside>
              </Pokeball>
            </Content>
        }
      </>
      
    
  );
}

export default PokeballIntro;
