export const styleCard = (
  index: number,
  actualPosition: number,
  regionPokemonsLength: number,
  renderedPokemons: number
): Object => {
  // styles every card rendered
  const selectedCard = actualPosition > regionPokemonsLength - 8
  // checks if the position is on the last 8 pokemons
    ? 7
    // if is in, the container is at the top and the selected card is always the seventh
    : renderedPokemons - 8
    // if isn't, the container is at the bottom, the card selected is between one and seven depending on the size of the array
  let styles = {}

  if (index === selectedCard) {
    // this is the selected card
    styles = {
      marginLeft: -3,
      backgroundColor: 'rgb(235, 230, 150)'
    }
  } else {
    styles = {
      marginLeft: Math.pow(index - selectedCard, 2),
      backgroundColor: `rgb(235, 230, 150,
        ${index < selectedCard
          // fadeout the cards that aren't selected
          ? `0.${(index - selectedCard) + 9}`
          // if x < y, return 0.1 + x⁻¹   example on cascade render:  0.2, 0.3, 0.4... (until the selected card, which is 1)
          : `0.${(selectedCard - index) + 9}`
          // if x > y, return 0.9 - x⁻¹   example on cascade render:  0.8, 0.7, 0.6... (until the selected card, which is 1)
        }
      )`
    }
  }
  return styles
}
