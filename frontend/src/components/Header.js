import React, { useState } from 'react';
import AccountPopover from './AccountPopover';
import Avatar from './Avatar';
import { MdLightMode, MdOutlineLightMode } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Header = ({ mode, handleDarkMode, name }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <nav className='dark:bg-dark bg-light fixed h-[60px] flex items-center w-[100vw] top-0 shadow-xl'>
            <div className='w-full relative flex flex-row items-center justify-between px-10 '>
                <Link to={name ? "/" : "/login"}>
                    <div className='flex items-center'>
                        {mode === "light" && <img height="55px" width="50px" src="./assets/Logo-light.png" alt="" />}
                        {mode === "dark" && <img height="55px" width="50px" src="./assets/Logo-dark.png" alt="" />}
                    </div>
                </Link>

                <div className='flex items-center justify-center gap-2'>
                    {mode === "dark" ?
                        <MdOutlineLightMode onClick={() => handleDarkMode("light")} className='text-btn cursor-pointer' fontSize="1.5rem" />
                        :
                        <MdLightMode onClick={() => handleDarkMode("dark")} className='text-btn cursor-pointer' fontSize="1.5rem" />
                    }
                    {name && <Avatar onClick={() => setOpen(!open)} name={name} type="round" />}
                </div>
                <AccountPopover open={open} handleClose={handleClose} />
            </div>
        </nav>
    )
}

export default Header;