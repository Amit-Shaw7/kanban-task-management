import React from 'react'

const Loader = () => {
    return (
        <div className='mt-60px bg-light dark:bg-dark h-[100vh] w-[100vw] flex items-center justify-center'>
            <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-btn opacity-75"></span>
        </div>
    )
}

export default Loader