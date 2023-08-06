import React from 'react'
import styled from 'styled-components'
import { styleCard } from '@utils'

interface ListProps {
  items: any[]
  actualPosition: number
  lastPosition: number
}

const Item = styled.li`
  display: flex;
  justify-content: center;
  width: 9.5rem;
  padding: 0.1rem;
  margin: 0.3rem;
  border-radius: 5px;
  background-color: black;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`

const OrderedList = styled.ol`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
`

const List: React.FC<ListProps> = ({ items, actualPosition, lastPosition }) => {
  const itemsRenderLimit = 8

  const styleContainer = (): Object => {
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
          data-testid="text-item"
          style={styleCard(i, actualPosition, lastPosition, items.length)}
          key={item.name}
        >
          {item.name}
        </Item>
      ))}
    </OrderedList>
  )
}

export default List
