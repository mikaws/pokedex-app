export const visualizePokemons = (pokemons: any[], position: number): any => {
  let slicedArray = []
  if (position === 0) {
    slicedArray = pokemons.slice(0, 5)
  } else if (position < 4) {
    slicedArray = pokemons.slice(0, position + 5)
  } else if (position >= 4 && position <= pokemons.length - 5) {
    slicedArray = pokemons.slice(position - 4, position + 5)
  } else if (position > pokemons.length - 4 && position < pokemons.length) {
    slicedArray = pokemons.slice(position - 4)
  }
  return slicedArray
}
