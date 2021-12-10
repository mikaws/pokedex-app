const fetchKantoPokemon = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=20'
  const res = await fetch(url)
  const data = await res.json()
  console.log(data)
  return data
}

export default fetchKantoPokemon