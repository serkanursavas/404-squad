import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface CardWrapperProps {
  children: ReactNode
  route?: string
  classname?: string
}

const CardWrapper: React.FC<CardWrapperProps> = ({ route, children, classname }) => {
  const navigate = useNavigate()

  function handleRoute() {
    route && navigate(route)
  }

  return (
    <div
      onClick={handleRoute}
      className={`p-4 space-y-4 text-sm  border-2 border-black cursor-pointer shadow-pixel ${classname}`}
    >
      {children}
    </div>
  )
}

export default CardWrapper
