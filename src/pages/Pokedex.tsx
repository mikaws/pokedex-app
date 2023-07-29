import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { fetchPokemons, fetchTargetPokemon } from '@services'
import { formatColor, visualizePokemons, styleCard } from '@utils'
import { useDebounce } from '@hooks/useDebounce'
import Card from '@components/Card/Card'
import Loading from '@components/Loading/Loading'
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
  background-image: linear-gradient(
    to top left,
    var(--pokeball-center-inactive),
    rgb(159, 83, 197)
  );
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
  background-image: linear-gradient(
    to top left,
    var(--pokeball-center-inactive),
    rgb(159, 83, 197)
  );
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
  font-size: 0;
`

let position = 0
let regionPokemons: any[] = []

const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[] | null>([])
  const [pokemonSprite, setPokemonSprite] = useState('')
  const [firstTypeColor, setFirstTypeColor] = useState('')
  // const [secondTypeColor, setSecondTypeColor] = useState('')
  const [keyUp, setKeyUp] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [location] = useState('kanto')

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      let pokemons: any[] = []
      pokemons = await fetchPokemons(location)
      regionPokemons = pokemons
    }
    fetchData()
  }, [location])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      let pokemon: Pokemon = {
        image: '',
        types: { firstType: '', secondType: '' }
      }
      try {
        setIsLoading(true)
        pokemon = await fetchTargetPokemon(keyUp)
        renderPokemonCard(pokemon)
      } catch (error) {
        console.error((error as Error).message)
        setPokemons(null)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [keyUp])

  const renderPokemonCard = (pokemon: Pokemon): void => {
    setPokemonSprite(pokemon.image)
    backgroundColorsHandler(pokemon.types.firstType, pokemon.types?.secondType)
    const data = visualizePokemons(regionPokemons, position)
    setPokemons(data)
    setIsLoading(false)
  }

  const checkKey = (e: KeyboardEvent): void => {
    if (e.key === 'ArrowUp') {
      setKeyUp((state) => (state === 1 ? state : state - 1))
      position = position === 0 ? position : position - 1
    } else if (e.key === 'ArrowDown') {
      if (position < regionPokemons.length - 1) {
        setKeyUp((state) => state + 1)
        position = position + 1
      }
    }
  }

  const debouncedChange = useDebounce(checkKey, 150)

  document.onkeydown = (e: KeyboardEvent) => debouncedChange(e)

  const backgroundColorsHandler = (
    firstType: string,
    secondType?: string
  ): void => {
    const firstColor = formatColor(firstType)
    // const secondColor = secondType && formatColor(secondType)

    setFirstTypeColor((actualColor) =>
      actualColor === firstColor ? actualColor : firstColor
    )
    // setSecondTypeColor(actualColor => secondColor ?? actualColor)
  }

  const styleContainer = (): Object => {
    return {
      alignSelf:
        position > regionPokemons.length - 8 // checks if the position is on the last 8 pokemons
          ? 'flex-start' // if is in, the container is at the top
          : 'flex-end' // if isn't, the container is at the bottom
    }
  }

  return (
    <PokedexWrapper data-testid="pokedex-wrap">
      <LeftBorder>
        <LeftBorderOutline />
      </LeftBorder>
      <Screen style={{ background: `linear-gradient(${firstTypeColor})` }}>
        <LeftContainer>
          <Card>
            <>
              {isLoading
                ? <Loading />
                : <PokemonImage
                  src={pokemonSprite}
                  alt="Pokemon"
                  data-testid="pokemon-img"
                  width={96}
                  height={96}
                />
              }
            </>
          </Card>
        </LeftContainer>
        <RightContainer data-testid="right-container" style={styleContainer()}>
          {pokemons
            ? (
                pokemons.map((pokemon, i) => (
              <TextCard
                data-testid="text-card"
                style={styleCard(
                  i,
                  position,
                  regionPokemons.length,
                  pokemons.length
                )}
                key={pokemon.name}
              >
                {pokemon.name}
              </TextCard>
                ))
              )
            : (
            <div data-testid="error"> Error, please refresh this page </div>
              )}
        </RightContainer>
      </Screen>
      <RightBorder>
        <RightBorderOutline />
      </RightBorder>
    </PokedexWrapper>
  )
}

export default Pokedex
