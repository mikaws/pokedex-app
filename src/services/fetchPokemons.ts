import { getRangeByRegion } from '@utils'

export async function fetchPokemons (region: string): Promise<any[] | Error> {
  const { limit, offset } = getRangeByRegion(region)
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}/`
  const res = await fetch(url)
    .then(res => res.json())
    .then(data => data.results)
    .catch(() => { throw new Error("Couldn't fetch data") })
  return res
}
