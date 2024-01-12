import React from 'react'
import styled, { CSSObject } from 'styled-components'
import { styleCard } from '@utils'

interface ListProps {
  items: Array<{ name: string, url: string }>
  actualPosition: number
  lastPosition: number
  click: (pokemon: { name: string, url: string }) => void
}

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`

const OrderedList = styled.ol`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 1em;
  width: 60%;
  gap: 0.8em;
  min-height: 55%;
  max-height: 100%;
  & li:nth-child(1):nth-last-child(5) {
    margin-top: 12.5em;
  }
  & li:nth-child(1):nth-last-child(6) {
    margin-top: 9.5em;
  }
  & li:nth-child(1):nth-last-child(7) {
    margin-top: 6.5em;
  }
  & li:nth-child(1):nth-last-child(8) {
    margin-top: 3.5em;
  }
  & li:nth-child(1):nth-last-child(n + 9) {
    margin-top: 0em;
  }
  @media (max-width: 800px) {
    margin-top: -1rem;
    li {
      margin-top: 0;
    }
  }
`

const Item = styled.li`
  display: flex;
  justify-content: left;
  width: 12em;
  padding: 0.5em;
  border-radius: 20px 5px 5px 20px;
  /* background-color: black; */
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 300px) {
    font-size: 0.8em;
    gap: 0.2em;
  }

  @media (max-height: 600px) {
    font-size: 12px;
  }
  @media (max-height: 500px) {
    font-size: 10px;
  }
  @media (max-height: 400px) {
    font-size: 8px;
  }
  @media (max-height: 300px) {
    font-size: 6px;
  }
  @media (max-height: 200px) {
    font-size: 4px;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
  width: 100%;
  height: 1.5em;
  @media (max-width: 768px) {
    gap: 0.25em;
  }
`

const Text = styled.p`
  width: auto;
`

const PokeballIcon = styled.span`
  width: 2em;
  height: 2em;
  border-radius: 1rem;
  background-color: #462222;
  opacity: 20%;
  @media (max-width: 600px) {
    width: 1.5em;
    height: 1.5em;
  }

  @media (max-width: 400px) {
    width: 1em;
    height: 1em;
  }
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
    <Div>
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
    </Div>
  )
}

export default List
