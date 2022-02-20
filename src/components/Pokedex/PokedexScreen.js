import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import fetchPokemons from '../../services/fetchPokemons'
import useDebounce from '../../hooks/useDebounce'
import {getTypeColor} from '../../utils/util.js'

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

const PokedexScreen = styled.div` 
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 0 30px;
  margin: 0px -125px;
  width: 1000px;
  height: 645px;
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
  width: 40%;
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

function Screen() {
  const [isClicked, setIsClicked] = useState(false)
  const [isExpand, setIsExpand] = useState(false)
  const [pokemonList, setPokemonList] = useState([])
  const [pokemonSprite, setPokemonSprite] = useState('')
  const [firstTypeColor, setFirstTypeColor] = useState('')
  const [secondTypeColor, setSecondTypeColor] = useState('')
  const [keyDown, setKeyDown] = useState(0)

  const checkKey = (e) =>{
    e = e || window.event;

    if (e.keyCode === 38) {
      setKeyDown(keyDown === 0 ? keyDown : keyDown - 1)
    }
    else if (e.keyCode === 40) {
      setKeyDown(keyDown + 1)
    }
  }

  const debouncedChange = useDebounce(checkKey, 150)

  document.onkeydown = (e) => debouncedChange(e)

  const fetchData = async () => {
    const pokemons = await fetchPokemons(keyDown)
    let length = pokemons.length
    let pokemonPosition = 0

    if(length >= 8 && length < 16) { pokemonPosition = length - 8 } 
    else if(length >= 16) { pokemonPosition = 8 }

    let pokemon = pokemons[pokemonPosition]
    let isDualType = pokemon.types.length > 1 ? true : false
    
    setPokemonSprite(pokemon.sprites.front_default) 
    setFirstTypeColor(getTypeColor(pokemon.types[0].type.name))
    setSecondTypeColor(isDualType ? getTypeColor(pokemon.types[1].type.name) : secondTypeColor)

    setPokemonList(pokemons)
  }

  useEffect(() => {
    if(isClicked){
      setTimeout(() => setIsExpand(true), 2000)
    }
    fetchData()
  }, [keyDown])

  const alignContainer = () => {
    if(pokemonList.length === 8) return { alignItems: 'flex-end'}
    else if(pokemonList.length > 8 && pokemonList.length <= 15) return { marginTop: 100 - (pokemonList.length - 8) * 10}
  }

  const styleContainers = (i) => {
    let initial = pokemonList.length - 8

    if (i === initial) return {
      transform: 'scale(1.1)',
      marginLeft: -1 * Math.pow(i-initial, 2),
      background: `rgb(235, 230, 150)`
    }
    else return {
      marginLeft: -1 * Math.pow(i-initial, 2),
      background: `rgb(235, 230, 150, ${i < initial ? `0.${i+9-initial}` : 1 - (0.085 - (initial * 0.005)) * i})`
    }
  }
  
  return (
    <>
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
  );
}

export default Screen;
