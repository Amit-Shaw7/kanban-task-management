import React from 'react'

const Card = ({ children, p , width }) => {
  return (
    <div className={`shadow-md p-${p ? p : "2"} h-max w-${width ? width : "[100%]"} dark:bg-dark-card bg-light-card rounded-md`}>
      {children}
    </div>
  )
}

export default Card