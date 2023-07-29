import React from 'react'
import { useNavigate } from 'react-router-dom'
import Pokeball from '@components/Pokeball/Pokeball'

const Intro: React.FC = () => {
  const navigate = useNavigate()
  const handleClick = (): void => {
    navigate('/home')
  }

  return <Pokeball onClick={handleClick}/>
}

export default Intro
