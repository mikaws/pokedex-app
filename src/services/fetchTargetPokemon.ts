import { Pokemon } from 'src/@types/Pokemon'

export async function fetchTargetPokemon (id: number): Promise<Pokemon | Error> {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return [
        {
          image: data.sprites.front_default,
          types: {
            firstType: data.types[0].type.name,
            secondType: data.types[1] ? data.types[1].type.name : undefined
          }
        }
      ][0]
    })
    .catch(() => {
      throw new Error("Couldn't fetch data")
    })
  return res
}
