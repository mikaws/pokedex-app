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
    padding: 0;
    opacity: 0;
  }
  100% {
    border-radius: 10px;
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
  background: linear-gradient(to top left, var(--pokeball-center-inactive), rgb(159, 83, 197));
  

  &:hover {
    transition: 1s ease-in;
    background: linear-gradient(to top left, var(--pokeball-center-inactive), rgb(240, 83, 197));
  }
`;

const PokeballLine = styled.div`
  width: 100%;
  height: 12%;
  background-color: var(--background);
  transform: rotate(36deg);
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
  background-image: linear-gradient(to top left, var(--pokeball-center-inactive), rgb(159, 83, 197));
  transition: 1s;
  cursor: pointer;

  &:hover {
    transition: 0.5s;
    background-color: var(--pokeball-center-active);
    background-image: linear-gradient(to top left, var(--pokeball-center-inactive), rgb(200, 83, 197));
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
  background-image: linear-gradient(to top left, var(--pokeball-center-inactive), rgb(159, 83, 197));
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
  background-image: linear-gradient(to top right, var(--pokeball-center-inactive), rgb(159, 83, 197));
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

const Pokemon = styled.div``

const TextContainer = styled.div`
  padding: 7.5px;
  margin: 5px;
  width: 150px;
  border-radius: 5px;
  text-align: center;
  background-color: black;
  cursor: pointer;
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }

`

const Text = styled.label`
  
`

const HalfRightInsideCircle = styled.div`
  float: right;
  width: 100px;
  height: 230px;
  margin: 0 -1px;
  background: var(--background);
  border-radius: 0 230px 230px 0;
`;

const PokedexScreen = styled.div` 
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 0 30px;
  margin: 0px -125px;
  width: 1000px;
  height: 630px;
  border-radius: 10px;
  background: rgb(59, 172, 172);
  animation: ${displayScreen} 5s;
  overflow-y: hidden;
`

const PokedexLeftContainer = styled.div` 
  width: 50%;
`

const PokedexRightContainer = styled.div` 
  width: 50%;
`

const PokedexImageContainer = styled.div`
align-items: center;
  width: 140px;
  border-radius: 10px;
  padding: 20px;
  background: #fff;
`

function PokeballIntro() {

  const [isClicked, setIsClicked] = useState(false)
  const [isExpand, setIsExpand] = useState(false)
  const [pokemonList, setPokemonList] = useState([])
  const [pokemonSprite, setPokemonSprite] = useState('')

  const handleClick = () => {
    setIsClicked(true)
  }

  const fetchData = async () => {
    const res = await fetchKantoPokemon()
    setPokemonList(res)
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
                <PokedexScreen>
                  <PokedexLeftContainer >
                      {pokemonList.map((pokemon,i) => (
                        <Pokemon key={pokemon.name} onClick={() => setPokemonSprite(pokemon.sprites.front_default)}>
                          <TextContainer
                            style={{
                              marginLeft: Math.pow(i-7, 2),
                              background: `rgb(214, 209, 130, ${i < 8 ? `0.${i+2}` : `${1 - 0.04 * i}`})`,
                            }}>
                            <Text style={{paddingLeft: Math.pow(i-7, 2) -50}}>
                              {pokemon.name}
                            </Text>
                          </TextContainer>
                        </Pokemon>
                      ))}
                  </PokedexLeftContainer>
                  <PokedexRightContainer >
                    <PokedexImageContainer>
                      {pokemonSprite ? <img src={pokemonSprite}/> : null}
                    </PokedexImageContainer>
                  </PokedexRightContainer>
                </PokedexScreen>
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
