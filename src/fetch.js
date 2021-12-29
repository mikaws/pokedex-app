const fetchKantoPokemon = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon/'
  let data = []
  for(let i=1; i<=16; i++){
    const res = await fetch(url+i)
    data.push(await res.json())
  }
  return data
}

export default fetchKantoPokemon