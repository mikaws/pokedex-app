import { PokemonDescription } from 'src/@types/PokemonDescription'

interface PokemonText {
  language: { name: string }
  version: { name: string }
  flavor_text: string
}
export async function fetchPokemonDescription (
  id: number
): Promise<PokemonDescription> {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`
  const res = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let firstDescription = data.egg_groups[0].name as string
      firstDescription =
        firstDescription.charAt(0).toUpperCase() + firstDescription.slice(1)
      let secondDescription = data?.egg_groups[1]
        ? `${data.egg_groups[1].name as string} `
        : ''
      secondDescription =
        secondDescription.charAt(0).toUpperCase() + secondDescription.slice(1)

      const result: PokemonDescription = {
        description: `${firstDescription} ${secondDescription}Pokémon`,
        text: (
          data.flavor_text_entries.find(
            (text: PokemonText) => text.language.name === 'en'
          ) as PokemonText
        ).flavor_text
      }
      return result
    })
    .catch(() => {
      throw new Error("Couldn't fetch data")
    })
  return res
}
