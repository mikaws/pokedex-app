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
  box-shadow: inset 0 0 1px 1px var(--background);
  box-shadow: 0 0 1px 1px var(--background);
  

  &:hover {
    transition: 1s ease-in;
    background: linear-gradient(to top left, var(--pokeball-center-inactive), rgb(200, 83, 197));
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
    background-image: linear-gradient(to top left, var(--pokeball-center-inactive), rgb(210, 83, 197));
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
  box-shadow: inset 0 0 0.5px 0.2px #3b0ca0;
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
  box-shadow: inset 0 0 0.5px 0.2px #3b0ca0;
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

  &:hover {
    transform: scale(1.05);
  }

`

const Text = styled.label`
  cursor: pointer;
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
  background: linear-gradient(90deg, #a198e5, #dbacac 80%, #3aaaaa);
  box-shadow: inset 0 0 1px 0.5px #3b0ca0;
  animation: ${displayScreen} 2s;
  overflow-y: hidden;
`

const PokedexLeftContainer = styled.div` 
  margin: 200px;
  width: 50%;
`

const PokedexRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  width: 50%;
`

const ImageContainerLayout = styled.div`
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

const PokedexImageContainer = styled.div`
  align-items: center;
  width: 140px;
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

function PokeballIntro() {

  const [isClicked, setIsClicked] = useState(false)
  const [isExpand, setIsExpand] = useState(false)
  const [pokemonList, setPokemonList] = useState([])
  const [pokemonSprite, setPokemonSprite] = useState('')
  const [firstTypeColor, setFirstTypeColor] = useState('')
  const [secondTypeColor, setSecondTypeColor] = useState('')
  const [keyDown, setKeyDown] = useState(0)

  const handleClick = () => {
    setIsClicked(true)
  }

  const fetchData = async () => {
    const res = await fetchKantoPokemon(keyDown)
    if(res.length === 8) {
      setPokemonSprite(res[0].sprites.front_default)
      if(res[0].types.length > 1){
        setFirstTypeColor(getTypeColor(res[0].types[0].type.name))
        setSecondTypeColor(getTypeColor(res[0].types[1].type.name))
      } else { setFirstTypeColor(getTypeColor(res[0].types[0].type.name)) }
    }
    else if(res.length === 9) {
      setPokemonSprite(res[1].sprites.front_default)
      if(res[1].types.length > 1){
        setFirstTypeColor(getTypeColor(res[1].types[0].type.name))
        setSecondTypeColor(getTypeColor(res[1].types[1].type.name))
      } else { setFirstTypeColor(getTypeColor(res[1].types[0].type.name)) }
    }
    else if(res.length === 10) {
      setPokemonSprite(res[2].sprites.front_default)
      if(res[2].types.length > 1){
        setFirstTypeColor(getTypeColor(res[2].types[0].type.name))
        setSecondTypeColor(getTypeColor(res[2].types[1].type.name))
      } else { setFirstTypeColor(getTypeColor(res[2].types[0].type.name)) }
    }
    else if(res.length === 11) {
      setPokemonSprite(res[3].sprites.front_default)
      if(res[3].types.length > 1){
        setFirstTypeColor(getTypeColor(res[3].types[0].type.name))
        setSecondTypeColor(getTypeColor(res[3].types[1].type.name))
      } else { setFirstTypeColor(getTypeColor(res[3].types[0].type.name)) }
    }
    else if(res.length === 12) {
      setPokemonSprite(res[4].sprites.front_default)
      if(res[4].types.length > 1){
        setFirstTypeColor(getTypeColor(res[4].types[0].type.name))
        setSecondTypeColor(getTypeColor(res[4].types[1].type.name))
      } else { setFirstTypeColor(getTypeColor(res[4].types[0].type.name)) }
    }
    else if(res.length === 13) {
      setPokemonSprite(res[5].sprites.front_default)
      if(res[5].types.length > 1){
        setFirstTypeColor(getTypeColor(res[5].types[0].type.name))
        setSecondTypeColor(getTypeColor(res[5].types[1].type.name))
      } else { setFirstTypeColor(getTypeColor(res[5].types[0].type.name)) }
    }
    else if(res.length === 14) {
      setPokemonSprite(res[6].sprites.front_default)
      if(res[6].types.length > 1){
        setFirstTypeColor(getTypeColor(res[6].types[0].type.name))
        setSecondTypeColor(getTypeColor(res[6].types[1].type.name))
      } else { setFirstTypeColor(getTypeColor(res[6].types[0].type.name)) }
    }
    else if(res.length === 15) {
      setPokemonSprite(res[7].sprites.front_default)
      if(res[7].types.length > 1){
        setFirstTypeColor(getTypeColor(res[7].types[0].type.name))
        setSecondTypeColor(getTypeColor(res[7].types[1].type.name))
      } else { setFirstTypeColor(getTypeColor(res[7].types[0].type.name)) }
    }
    else if(res.length >= 16) {
      setPokemonSprite(res[8].sprites.front_default)
      if(res[8].types.length > 1){
        setFirstTypeColor(getTypeColor(res[8].types[0].type.name))
        setSecondTypeColor(getTypeColor(res[8].types[1].type.name))
      } else { setFirstTypeColor(getTypeColor(res[8].types[0].type.name)) }
    }
    res[0].id === 1 && res.length === 8 && setPokemonSprite(res[0].sprites.front_default)
    setPokemonList(res)
  }

  const getTypeColor = (type) => {
    if(type === 'normal') return '#A8A878'
    else if(type === 'fire') return '#F08030'
    else if(type === 'fighting') return '#C03028'
    else if(type === 'water') return '#6890F0'
    else if(type === 'flying') return '#A890F0'
    else if(type === 'grass') return '#78C850'
    else if(type === 'poison') return '#A040A0'
    else if(type === 'electric') return '#F8D030'
    else if(type === 'ground') return '#E0C068'
    else if(type === 'psychic') return '#F85888'
    else if(type === 'rock') return '#B8A038'
    else if(type === 'ice') return '#98D8D8'
    else if(type === 'bug') return '#A8B820'
    else if(type === 'dragon') return '#7038F8'
    else if(type === 'ghost') return '#705898'
    else if(type === 'dark') return '#705848'
    else if(type === 'steel') return '#B8B8D0'
    else if(type === 'fairy') return '#EE99AC'
  }

  useEffect(() => {
    if(isClicked){
      setTimeout(() => setIsExpand(true), 2000)
    }
    fetchData()
  }, [isClicked, keyDown])


  const checkKey = (e) => {
      e = e || window.event

      if (e.keyCode === '38') {
        setKeyDown(keyDown === 0 ? keyDown : keyDown - 1)
      }
      else if (e.keyCode === '40') {
        setKeyDown(keyDown + 1)
      }
  }

  document.onkeydown = checkKey;

  const alignContainer = () => {
    if(pokemonList.length === 8) return { alignItems: 'flex-end'}
    else if(pokemonList.length === 9) return { marginTop: 90}
    else if(pokemonList.length === 10) return { marginTop: 80}
    else if(pokemonList.length === 11) return { marginTop: 70}
    else if(pokemonList.length === 12) return { marginTop: 60}
    else if(pokemonList.length === 13) return { marginTop: 50}
    else if(pokemonList.length === 14) return { marginTop: 40}
    else if(pokemonList.length === 15) return { marginTop: 30}
  }

  const styleContainers = (i) => {
    if(pokemonList.length === 8) {
      if(i === 0) return { transform: 'scale(1.1)', marginLeft: -1 * Math.pow(i, 2), background: `rgb(234, 229, 150)`}
      else return { marginLeft: -1 * Math.pow(i, 2), background: `rgb(234, 229, 150, ${1 - 0.085 * i})`}
    }
    else if(pokemonList.length === 9) {
      if(i === 1) return { transform: 'scale(1.1)', marginLeft: -1 * Math.pow(i-1, 2), background: `rgb(234, 229, 150)`}
      else return { marginLeft: -1 * Math.pow(i-1, 2), background: `rgb(234, 229, 150, ${i < 1 ? `0.${i+8}` : `${1 - 0.08 * i}`})`}
    }
    else if(pokemonList.length === 10){
      if(i === 2) return { transform: 'scale(1.1)', marginLeft: -1 * Math.pow(i-2, 2), background: `rgb(234, 229, 150)`}
      else return { marginLeft: -1 * Math.pow(i-2, 2), background: `rgb(234, 229, 150, ${i < 2 ? `0.${i+7}` : `${1 - 0.075 * i}`})`}
    }
    else if(pokemonList.length === 11){
      if(i === 3) return { transform: 'scale(1.1)', marginLeft: -1 * Math.pow(i-3, 2), background: `rgb(234, 229, 150)`}
      else return { marginLeft: -1 * Math.pow(i-3, 2), background: `rgb(234, 229, 150, ${i < 3 ? `0.${i+6}` : `${1 - 0.065 * i}`})`}
    }
    else if(pokemonList.length === 12){
      if(i === 4) return { transform: 'scale(1.1)', marginLeft: -1 * Math.pow(i-4, 2), background: `rgb(234, 229, 150)`}
      else return { marginLeft: -1 * Math.pow(i-4, 2), background: `rgb(234, 229, 150, ${i < 4 ? `0.${i+5}` : `${1 - 0.06 * i}`})`}
    }
    else if(pokemonList.length === 13){
      if(i === 5) return { transform: 'scale(1.1)', marginLeft: -1 * Math.pow(i-5, 2), background: `rgb(234, 229, 150)`}
      else return { marginLeft: -1 * Math.pow(i-5, 2), background: `rgb(234, 229, 150, ${i < 5 ? `0.${i+4}` : `${1 - 0.055 * i}`})`}
    }
    else if(pokemonList.length === 14){
      if(i === 6) return { transform: 'scale(1.1)', marginLeft: -1 * Math.pow(i-6, 2), background: `rgb(234, 229, 150)`}
      else return { marginLeft: -1 * Math.pow(i-6, 2), background: `rgb(234, 229, 150, ${i < 6 ? `0.${i+3}` : `${1 - 0.05 * i}`})`}
    }
    else if(pokemonList.length === 15){
      if(i === 7) return { transform: 'scale(1.1)', marginLeft: -1 * Math.pow(i-7, 2), background: `rgb(234, 229, 150)`}
      else return { marginLeft: -1 * Math.pow(i-7, 2), background: `rgb(234, 229, 150, ${i < 7 ? `0.${i+2}` : `${1 - 0.045 * i}`})`}
    }
    else{
      if(i === 8) return { transform: 'scale(1.1)', marginLeft: -1 * Math.pow(i-8, 2), background: `rgb(234, 229, 150)`}
      else return {
        marginLeft: -1 * Math.pow(i-8, 2),
        background: `rgb(234, 229, 150, ${i < 8 ? `0.${i+1}` : `${1 - 0.042 * i}`})`
      }
    }
  }
  
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
                <PokedexScreen style={{background: `linear-gradient(${firstTypeColor}, ${secondTypeColor})`}}>
                  <PokedexLeftContainer > 
                    {pokemonSprite && 
                      <ImageContainerLayout>
                        <PokedexImageContainer>
                          <img src={pokemonSprite} alt='Pokemon'/>
                        </PokedexImageContainer>
                      </ImageContainerLayout>
                    }
                  </PokedexLeftContainer>
                  <PokedexRightContainer style={alignContainer}>
                    {pokemonList.map((pokemon,i) => (
                      <Pokemon key={pokemon.name}>
                        <TextContainer
                          style={styleContainers(i)}>
                          <Text>
                            {pokemon.name}
                          </Text>
                        </TextContainer>
                      </Pokemon>
                    ))}
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
