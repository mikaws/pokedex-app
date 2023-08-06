import Card from '@components/Card/Card'
import Image from '@components/Image/Image'
import Loading from '@components/Loading/Loading'
import Pokedex from '@components/Pokedex/Pokedex'
import List from '@components/List/List'
import { useDebounce } from '@hooks/useDebounce'
import React, { useEffect, useState } from 'react'
import { Pokemon } from 'src/@types/Pokemon'
import styled from 'styled-components'
import { fetchPokemons, fetchTargetPokemon } from '@services'
import { formatColor, visualizePokemons } from '@utils'

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin: 1rem;
  width: 50%;
`

const TextCard = styled.li`
    display: flex;
    justify-content: center;
    width: 20rem;
    padding: 0.5rem;
    margin: 1rem;
    border-radius: 5px;
    background-color: rgb(255, 249, 172);
    text-align: justify;
    font-size: 0.75rem;
    font-weight: 300;
    color: black;
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
  const [isLoadingFirstRender, setIsLoadingFirstRender] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(true)
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
    (async (): Promise<void> => {
      try {
        setIsLoading(true)
        const targetPokemon = await fetchTargetPokemon(keyUp)
        renderPokemonCard(targetPokemon as Pokemon)
      } catch (error) {
        console.error((error as Error).message)
        setIsError(true)
      } finally {
        setIsLoading(false)
        setIsLoadingFirstRender(false)
      }
    })()
  }, [regionPokemons, keyUp])

  function renderPokemonCard (pokemon: Pokemon): void {
    setPokemonSprite(pokemon.image)
    backgroundColorsHandler(pokemon.types.firstType, pokemon.types?.secondType)
    const pokemonsToVisualize = visualizePokemons(regionPokemons, position)
    setPokemons(pokemonsToVisualize)
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
    setSecondTypeColor(actualColor => secondColor ?? actualColor)
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
            style={{ marginLeft: '2rem' }}
          />
          <TextCard>
            Error! There is a unknown psychic power interfering our
             communication with the National Pokedex Data Center.
            Please try again later until we stablish the connection.
          </TextCard>
        </>
      </Pokedex>
    )
  }

  if (isLoadingFirstRender) {
    return <Pokedex><Loading/></Pokedex>
  }

  return (
    <Pokedex primaryColor={firstTypeColor} secondaryColor={secondTypeColor} >
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
        </ImageContainer>
        <List
          items={pokemons}
          actualPosition={position}
          lastPosition={regionPokemons.length}
        />
      </>
    </Pokedex>
  )
}

export default Home
