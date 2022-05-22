export const visualizePokemons = (pokemons: any[], position: number): any => {
  let slicedArray = []
  if (position === 0) {
    slicedArray = pokemons.slice(0, 8)
  } else if (position < 7) {
    slicedArray = pokemons.slice(0, position + 8)
  } else if (position >= 7 && position <= pokemons.length - 7) {
    slicedArray = pokemons.slice(position - 7, position + 8)
  } else if (position > pokemons.length - 7 && position < pokemons.length) {
    slicedArray = pokemons.slice(position - 7)
  }
  return slicedArray
}
