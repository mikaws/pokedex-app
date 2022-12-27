import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { fetchPokemons, fetchTargetPokemon } from '@services'
import { formatColor, visualizePokemons } from '@utils'
import { useDebounce } from '@hooks/useDebounce'
import Card from '@components/Card/Card'
import Loading from '@components/Loading/Loading'
import Pokeball from '@components/Pokeball/Pokeball'
import { Pokemon } from 'src/@types/Pokemon'

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

const openPokeballToLeft = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`

const openPokeballToRight = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`

const PokedexWrapper = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  height: 100vh;
  width: 100vw;
`

const LeftBorder = styled.div`
  animation: ${openPokeballToLeft} 2s;
  display: flex;
  align-items: center;
  justify-content: right;
  width: 25rem;
  height: 30rem;
  background: var(--pokeball-inactive);
  background-image: linear-gradient(to top left, var(--pokeball-center-inactive), rgb(159, 83, 197));
  border-radius: 40rem 0 0 40rem;
  box-shadow: inset 0 0 0.5px 0.2px #3b0ca0;
  margin-left: 3rem;
`

const LeftBorderOutline = styled.div`
  width: 35%;
  height: 35%;
  margin: 0 -1px;
  background: var(--background);
  border-radius: 14.5rem 0 0 14.5rem;
`

const RightBorder = styled.div`
  animation: ${openPokeballToRight} 2s;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 25rem;
  height: 30rem;
  background: var(--pokeball-inactive);
  background-image: linear-gradient(to top left, var(--pokeball-center-inactive), rgb(159, 83, 197));
  border-radius: 0 40rem 40rem 0;
  box-shadow: inset 0 0 0.5px 0.2px #3b0ca0;
  margin-right: 3rem;
`

const RightBorderOutline = styled.div`
  width: 35%;
  height: 35%;
  margin: 0 -1px;
  background: var(--background);
  border-radius: 0 14.5rem 14.5rem 0;
`

const TextCard = styled.div`
  display: flex;
  justify-content: center;
  width: 9.5rem;
  padding: 0.1rem;
  margin: 0.3rem;
  border-radius: 5px;
  background-color: black;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`

const Screen = styled.div` 
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30rem;
  border-radius: 0.8rem;
  background: linear-gradient(90deg, #a198e5, #dbacac 80%, #3aaaaa);
  box-shadow: inset 0 0 1px 0.5px #3b0ca0;
  animation: ${displayScreen} 2s;
  margin: 0 1rem 0 1rem;
  z-index: 1 !important;
`

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin: 1rem;
  width: 50%;
`

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
`

const PokemonImage = styled.img`
  display: inline-block;
`

let loadtime = 0
let position = 0
let regionPokemons: any[] = []

const Pokedex: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false)
  const [pokemons, setPokemons] = useState<any[]>([])
  const [pokemonSprite, setPokemonSprite] = useState('')
  const [firstTypeColor, setFirstTypeColor] = useState('')
  const [secondTypeColor, setSecondTypeColor] = useState('')
  const [keyUp, setKeyUp] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const [location] = useState('kanto')
  const startTime = new Date().getTime()

  useEffect(() => {
    setLoaded(loaded => loadtime > 1000 ? false : loaded)
  }, [pokemonSprite])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      let pokemons: any[] = []
      let errorStatus = false
      try {
        pokemons = await fetchPokemons(location)
      } catch (error) {
        console.error(error)
        errorStatus = true
      }
      regionPokemons = errorStatus ? regionPokemons : pokemons
    }
    fetchData()
  }, [location])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      let pokemon: Pokemon = { image: '', types: { firstType: '', secondType: '' } }
      let errorStatus = false
      try {
        pokemon = await fetchTargetPokemon(keyUp)
      } catch (error) {
        console.error(error)
        errorStatus = true
      }

      !errorStatus && backgroundColorsHandler(pokemon.types.firstType, pokemon.types?.secondType)

      setPokemonSprite(current => errorStatus ? current : pokemon.image)

      const data = visualizePokemons(regionPokemons, position)
      setPokemons(data)
    }
    fetchData()
  }, [keyUp])

  const checkKey = (e: KeyboardEvent): void => {
    if (e.key === 'ArrowUp') {
      setKeyUp(state => state === 1 ? state : state - 1)
      position = position === 0 ? position : position - 1
    } else if (e.key === 'ArrowDown') {
      if (position < regionPokemons.length - 1) {
        setKeyUp(state => state + 1)
        position = position + 1
      }
    }
  }

  const debouncedChange = useDebounce(checkKey, 150)

  document.onkeydown = (e: KeyboardEvent) => debouncedChange(e)

  const doneLoading = (): void => {
    loadtime = new Date().getTime() - startTime
    setLoaded(true)
  }

  const backgroundColorsHandler = (firstType: string, secondType?: string): void => {
    const firstColor = formatColor(firstType)
    const secondColor = secondType && formatColor(secondType)

    setFirstTypeColor(actualColor => actualColor === firstColor ? actualColor : firstColor)
    setSecondTypeColor(actualColor => secondColor ?? actualColor)
  }

  const styleContainer = (): Object => {
    return {
      alignSelf: position > regionPokemons.length - 8
      // checks if the position is on the last 8 pokemons
        ? 'flex-start'
        // if is in, the container is at the top
        : 'flex-end'
        // if isn't, the container is at the bottom
    }
  }

  const styleCards = (index: number): Object => {
    // styles every card rendered
    const selectedCard = position > regionPokemons.length - 8
    // checks if the position is on the last 8 pokemons
      ? 7
      // if is in, the container is at the top and the selected card is always the seventh
      : pokemons.length - 8
      // if isn't, the container is at the bottom, the card selected is between one and seven depending on the size of the array

    let styles = {}

    if (index === selectedCard) {
      // this is the selected card
      styles = {
        marginLeft: Math.pow(index - selectedCard, 2) - 4,
        background: 'rgb(235, 230, 150)'
      }
    } else {
      styles = {
        marginLeft: Math.pow(index - selectedCard, 2),
        background: `rgb(235, 230, 150,
          ${index < selectedCard
            // fadeout the cards that aren't selected
            ? `0.${(index - selectedCard) + 9}`
            // if x < y, return 0.1 + x⁻¹   example on cascade render:  0.2, 0.3, 0.4... (until the selected card, which is 1)
            : `0.${(selectedCard - index) + 9}`
            // if x > y, return 0.9 - x⁻¹   example on cascade render:  0.8, 0.7, 0.6... (until the selected card, which is 1)
          }
        )`
      }
    }
    return styles
  }

  const handleClick = (click: boolean): void => {
    setIsClicked(click)
  }

  return (
    isClicked
      ? <PokedexWrapper data-testid='pokedex-wrap'>
          <LeftBorder>
            <LeftBorderOutline/>
          </LeftBorder>
          <Screen style={{ background: `linear-gradient(${firstTypeColor}, ${secondTypeColor})` }}>
            <LeftContainer>
              <Card>
                <>
                  {!loaded && <Loading/>}
                  <PokemonImage
                    style={!loaded ? { display: 'none' } : {}}
                    src={pokemonSprite}
                    alt='Pokemon'
                    width={96}
                    height={96}
                    onLoad={doneLoading}/>
                </>
              </Card>
            </LeftContainer>
            <RightContainer style={styleContainer()}>
              {pokemons.map((pokemon, i) => (
                <TextCard
                  style={styleCards(i)}
                  key={pokemon.name}>
                    {pokemon.name}
                </TextCard>
              ))}
            </RightContainer>
          </Screen>
          <RightBorder>
            <RightBorderOutline/>
          </RightBorder>
        </PokedexWrapper>
      : <Pokeball onClick={handleClick}/>
  )
}

export default Pokedex
