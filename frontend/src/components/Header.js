import React, { useState } from 'react'
import AccountPopover from './AccountPopover';
import Avatar from './Avatar';
import { MdDarkMode, MdLightMode, MdOutlineLightMode } from 'react-icons/md';

const Header = ({ darkMode, handleDarkMode, name }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <nav className='dark:bg-dark bg-light fixed h-[60px] flex items-center w-[100vw] top-0 shadow-xl'>
            <div className='w-full relative flex flex-row items-center justify-between px-10 '>
                <div className='flex items-center'>
                    <p className='dark:text-white text-black text-xl'>
                        Manage
                    </p>
                </div>

                <div className='flex items-center justify-center gap-2'>
                    {darkMode ?
                        <MdOutlineLightMode onClick={() => handleDarkMode(false)} className='text-btn cursor-pointer' fontSize="1.5rem" />
                        :
                        <MdLightMode onClick={() => handleDarkMode(true)} className='text-btn cursor-pointer' fontSize="1.5rem" />
                    }
                    {name && <Avatar onClick={() => setOpen(!open)} name={name} type="round" />}
                </div>
                <AccountPopover open={open} handleClose={handleClose} />
            </div>
        </nav>
    )
}

export default Header