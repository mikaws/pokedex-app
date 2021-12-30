const fetchKantoPokemon = async (position) => {
  let data =[]
  let res = []
  let newPosition = 0;
  if (position > 8) { 
    newPosition = position - 8
  }
  const url = 'https://pokeapi.co/api/v2/pokemon/'
  for(let i=1; position < 8 ? i<=8+position : i<=16; i++){
    res = await fetch(url +( position < 8 ? i : i + newPosition))
    data.push(await res.json())
  }

  return data
}

export default fetchKantoPokemon