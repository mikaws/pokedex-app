import Card from '@components/Card/Card'
import Image from '@components/Image/Image'
import Loading from '@components/Loading/Loading'
import Pokedex from '@components/Pokedex/Pokedex'
import List from '@components/List/List'
import { useDebounce } from '@hooks/useDebounce'
import React, { useEffect, useState } from 'react'
import { Pokemon } from 'src/@types/Pokemon'
import styled from 'styled-components'
import {
  fetchPokemonDescription,
  fetchPokemons,
  fetchTargetPokemon
} from '@services'
import { formatColor, visualizePokemons } from '@utils'
import { PokemonDescription } from 'src/@types/PokemonDescription'

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 1em;
  width: 50%;
  font-size: 12px;
  @media (max-width: 600px) {
    margin-top: 2rem;
    flex-direction: row;
    width: 100%; 
    align-items: center;
    justify-content: center;
    gap: 1em;
  }
`

const TextCardWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  padding: 0.5em;
  padding-left: 0.75em;
  padding-right: 0.75em;
  border-radius: 10px;
  background: #57bcf3;
  border: 1px solid #3f85aa;
  @media (max-width: 600px) {
    width: 14em; 
    height: auto;
    padding: auto;
  }
`

const TextCard = styled.div`
  position: relative;
  width: auto;
  height: auto;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #fff;
  font-weight: 300;
  color: black;
`

const ErrorTextCard = styled.div`
  display: flex;
  justify-content: center;
  width: 20em;
  padding: 0.5em;
  margin: 1em;
  border-radius: 5px;
  background-color: rgb(255, 249, 172);
  text-align: justify;
  font-size: 0.75em;
  font-weight: 300;
  color: black;
`

const Information = styled.p`
`

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([])
  const [regionPokemons, setRegionPokemons] = useState<any[]>([])
  const [isError, setIsError] = useState<boolean>(false)
  const [pokemonSprite, setPokemonSprite] = useState<string>('')
  const [firstTypeColor, setFirstTypeColor] = useState<string>('')
  const [secondTypeColor, setSecondTypeColor] = useState<string>('')
  const [keyUp, setKeyUp] = useState<number>(1)
  const [position, setPosition] = useState<number>(0)
  const [isLoadingFirstRender, setIsLoadingFirstRender] =
    useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [text, setText] = useState<string>('')
  const location: string = 'kanto'

  const debouncedChange = useDebounce(checkKey, 150)
  document.onkeydown = (e: KeyboardEvent) => debouncedChange(e)

  function checkKey (e: KeyboardEvent): void {
    if (e.key === 'ArrowUp') {
      setKeyUp((prev) => Math.max(1, prev - 1))
      setPosition((prev) => Math.max(0, prev - 1))
    } else if (e.key === 'ArrowDown' && position < regionPokemons.length - 1) {
      setKeyUp((prev) => prev + 1)
      setPosition((prev) => prev + 1)
    }
  }

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const pokemonsFetched = await fetchPokemons(location)
        setRegionPokemons(pokemonsFetched as any[])
      } catch (error) {
        console.error((error as Error).message)
        setIsError(true)
      }
    })()
  }, [location])

  useEffect(() => {
    updatePokemonList(keyUp)
  }, [regionPokemons, keyUp])

  function updateMainPokemonByPosition (pokemon: {
    name: string
    url: string
  }): void {
    const pokemonId = parseInt(
      pokemon.url.split('/pokemon/')[1].replace('/', '')
    )
    if (pokemonId) {
      setKeyUp(pokemonId)
      setPosition(pokemonId - 1)
    }
  }

  async function updatePokemonList (pokemonId: number): Promise<void> {
    try {
      setIsLoading(true)
      const targetPokemon = await fetchTargetPokemon(pokemonId)
      const pokemonDescription = await fetchPokemonDescription(pokemonId)
      renderPokemonCard(targetPokemon as Pokemon)
      renderPokemonDescription(pokemonDescription)
    } catch (error) {
      console.error(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
      setIsLoadingFirstRender(false)
    }
  }

  function renderPokemonCard (pokemon: Pokemon): void {
    setPokemonSprite(pokemon.image)
    backgroundColorsHandler(pokemon.types.firstType, pokemon.types?.secondType)
    const pokemonsToVisualize = visualizePokemons(regionPokemons, position)
    setPokemons(pokemonsToVisualize)
  }

  function renderPokemonDescription (
    pokemonDescription: PokemonDescription
  ): void {
    setText(pokemonDescription.text)
  }

  function backgroundColorsHandler (
    firstType: string,
    secondType?: string
  ): void {
    const firstColor = formatColor(firstType)
    const secondColor = secondType && formatColor(secondType)
    setFirstTypeColor((actualColor) =>
      actualColor === firstColor ? actualColor : firstColor
    )
    setSecondTypeColor((actualColor) => secondColor ?? actualColor)
  }

  if (isError) {
    return (
      <Pokedex>
        <>
          <Image
            isLoading={isLoading}
            src="oak-professor.png"
            alt="oak-professor"
            width={55}
            height={87}
            style={{ marginLeft: '2em' }}
          />
          <ErrorTextCard>
            Error! There is a unknown psychic power interfering our
            communication with the National Pokedex Data Center. Please try
            again later until we stablish the connection.
          </ErrorTextCard>
        </>
      </Pokedex>
    )
  }

  if (isLoadingFirstRender) {
    return (
      <Pokedex>
        <Loading />
      </Pokedex>
    )
  }

  return (
    <Pokedex primaryColor={firstTypeColor} secondaryColor={secondTypeColor}>
      <>
        <ImageContainer>
          <Card>
            <Image
              isLoading={isLoading}
              src={pokemonSprite}
              alt="pokemon"
              width={96}
              height={96}
            />
          </Card>
          <TextCardWrapper>
            <TextCard>
              <Information data-test-id="pokemon-info">{text}</Information>
            </TextCard>
          </TextCardWrapper>
        </ImageContainer>
        <List
          click={updateMainPokemonByPosition}
          items={pokemons}
          actualPosition={position}
          lastPosition={regionPokemons.length}
        />
      </>
    </Pokedex>
  )
}

export default Home
