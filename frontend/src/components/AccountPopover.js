import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/actions/UserActions';
import Card from './Card';

const AccountPopover = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout(navigate));
        handleClose();
    }
    return (
        <>
            {
                open &&
                <div className='absolute top-[105%] cursor-pointer right-10 transition-all'>
                    <Card>
                        <p className='dark:text-white text-black' onClick={handleLogout}>Logout</p>
                    </Card>
                </div>
            }
        </>
    )
}

export default AccountPopover