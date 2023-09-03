import React from 'react'

const Avatar = ({onClick ,  name }) => {
    return (
        <div onClick={onClick} className='cursor-pointer h-[50px] w-[50px] flex items-center justify-center p-1 rounded-full dark:bg-dark-card bg-gray'>
            <p className='dark:text-white text-black text-2xl'>{name?.charAt(0)?.toUpperCase()}</p>
        </div>
    )
}

export default Avatar