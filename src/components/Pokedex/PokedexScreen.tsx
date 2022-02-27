import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { fetchPokemons } from '../../services/fetchPokemons'
import { useDebounce } from '../../hooks/useDebounce'
import { getTypeColor } from '../../utils/util'
import Card from '../Card/Card'

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

const TextCard = styled.div`
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

const Background = styled.div` 
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

const LeftContainer = styled.div` 
  margin: 200px;
  width: 50%;
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  width: 40%;
`

const PokedexScreen: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([])
  const [pokemonSprite, setPokemonSprite] = useState('')
  const [firstTypeColor, setFirstTypeColor] = useState('')
  const [secondTypeColor, setSecondTypeColor] = useState('')
  const [keyDown, setKeyDown] = useState(0)

  const checkKey = (e: KeyboardEvent) =>{
    if (e.key === 'ArrowUp') {
      setKeyDown(keyDown === 0 ? keyDown : keyDown - 1)
    }
    else if (e.key === 'ArrowDown') {
      setKeyDown(keyDown + 1)
    }
  }

  const debouncedChange = useDebounce(checkKey, 150)

  document.onkeydown = (e: KeyboardEvent) => debouncedChange(e)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchPokemons(keyDown)
      let length = res.length
      let pokemonPosition = 0
  
      if(length >= 8 && length < 16) {
        pokemonPosition = length - 8
      } else if(length >= 16) {
        pokemonPosition = 8
      }
  
      let pokemon = res[pokemonPosition]

      backgroundColorsHandler(pokemon.types[0].type.name, pokemon.types[1]?.type.name)
      
      setPokemonSprite(pokemon.sprites.front_default) 
      setPokemons(res)
    }
    fetchData()
  }, [keyDown])

  const backgroundColorsHandler = (firstType: string, secondType?: string) => {
    let firstColor = getTypeColor(firstType)
    let secondColor = secondType && getTypeColor(secondType)
    
    setFirstTypeColor(actualColor => actualColor === firstColor ? actualColor : firstColor)
    setSecondTypeColor(actualColor => secondColor ? secondColor : actualColor)
  }

  const styleContainers = (index: number) => {
    let initial = pokemons.length - 8

    if (index === initial) return {
      transform: 'scale(1.1)',
      marginLeft: -1 * Math.pow(index-initial, 2),
      background: `rgb(235, 230, 150)`
    }
    else return {
      marginLeft: -1 * Math.pow(index-initial, 2),
      background: `rgb(235, 230, 150, ${index < initial ? `0.${index+9-initial}` : 1 - (0.085 - (initial * 0.005)) * index})`
    }
  }
  
  return (
    <Background style={{background: `linear-gradient(${firstTypeColor}, ${secondTypeColor})`}}>
      <LeftContainer> 
        <Card>
          <img src={pokemonSprite} alt='Pokemon'/>
        </Card>
      </LeftContainer>
      <RightContainer>
        {pokemons.map((pokemon,i) => (
          <TextCard
            style={styleContainers(i)}
            key={pokemon.name}>
              {pokemon.name}
          </TextCard>
        ))}
      </RightContainer>
    </Background>
  );
}

export default PokedexScreen;
