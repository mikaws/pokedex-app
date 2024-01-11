import React from 'react'
import styled, { CSSObject } from 'styled-components'
import { styleCard } from '@utils'

interface ListProps {
  items: Array<{ name: string, url: string }>
  actualPosition: number
  lastPosition: number
  click: (pokemon: { name: string, url: string }) => void
}

const OrderedList = styled.ol`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 1rem;
  width: 60%;
  gap: 0.8rem;
  min-height: 55%;
  max-height: 100%;
`

const Item = styled.li`
  display: flex;
  justify-content: left;
  width: 12rem;
  padding: 0.5rem;
  border-radius: 20px 5px 5px 20px;
  /* background-color: black; */
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 600px) {
    width: 8rem;
    font-size: 0.6rem;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 1.5rem;
  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`

const Text = styled.p`
  width: auto;
  /* height: 1rem; */
`

const PokeballIcon = styled.span`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: red;
  opacity: 20%;
`

const List: React.FC<ListProps> = ({
  items,
  actualPosition,
  lastPosition,
  click
}) => {
  const itemsRenderLimit = 5

  const styleContainer = (): CSSObject => {
    return {
      alignSelf:
        // having 500 position, if the actual position is between 492 and 500
        // will invert the container to looks like the ending of the list
        actualPosition > lastPosition - itemsRenderLimit
          ? 'flex-start' // if is in last positions, the container is at the top
          : 'flex-end' // else, the container is at the bottom
    }
  }
  return (
    <OrderedList data-testid="ordered-list" style={styleContainer()}>
      {items.map((item, i) => (
        <Item
          onClick={() => click(item)}
          data-testid="text-item"
          style={styleCard(i, actualPosition, lastPosition, items.length)}
          key={item.name}
        >
          <TextContainer>
            <PokeballIcon />
            <Text>{item.url.split('/pokemon/')[1].replace('/', '')}</Text>
            <Text>{item.name.toUpperCase()}</Text>
          </TextContainer>
        </Item>
      ))}
    </OrderedList>
  )
}

export default List
