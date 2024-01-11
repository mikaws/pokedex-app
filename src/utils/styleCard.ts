import { CSSObject } from 'styled-components'

export const styleCard = (
  index: number,
  actualPosition: number,
  regionPokemonsLength: number,
  renderedPokemons: number
): CSSObject => {
  // styles every card rendered
  const selectedCard = actualPosition > regionPokemonsLength - 5
  // checks if the position is on the last 5 pokemons
    ? 4
    // if is in, the container is at the top and the selected card is always the seventh
    : renderedPokemons - 5
    // if isn't, the container is at the bottom, the card selected is between one and seven depending on the size of the array
  let styles: CSSObject = {}

  if (index === selectedCard) {
    // this is the selected card
    styles = {
      marginLeft: -50,
      backgroundColor: 'rgb(235, 230, 150)',
      transition: 'ease-in'
    }
  } else {
    styles = {
      marginLeft: Math.pow(index - selectedCard, 2) * 4,
      backgroundColor: `rgb(235, 230, 150,
        ${index < selectedCard
          // fadeout the cards that aren't selected
          ? `0.${(index - selectedCard) + 9}`
          // if x < y, return 0.1 + x⁻¹   example on cascade render:  0.2, 0.3, 0.4... (until the selected card, which is 1)
          : `0.${(selectedCard - index) + 9}`
          // if x > y, return 0.9 - x⁻¹   example on cascade render:  0.5, 0.7, 0.6... (until the selected card, which is 1)
        }
      )`
    }
  }
  return styles
}
