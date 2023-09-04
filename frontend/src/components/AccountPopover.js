import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/actions/UserActions';
import Card from './Card';
import { toast } from 'react-hot-toast';

const AccountPopover = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        toast.loading("Logging out");
        await dispatch(logout(navigate));
        handleClose();
    }
    return (
        <>
            {
                open &&
                <div onClick={handleLogout} className='absolute top-[105%] cursor-pointer right-10 transition-all'>
                    <Card>
                        <p className='dark:text-white text-black'>Logout</p>
                    </Card>
                </div>
            }
        </>
    )
}

export default AccountPopover