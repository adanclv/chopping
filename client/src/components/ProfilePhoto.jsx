import '../styles/Profile.css';
import userPhoto from '../assets/user.png';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePhoto({ user, id, name, logout }) {
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const navigate = useNavigate();

    const onClickCircle = () => {
        setIsOpenProfile(!isOpenProfile);
    };

    const handleRedirect = (path) => {
        navigate(path);
        setIsOpenProfile(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpenProfile && !event.target.closest('.profile-dropdown-container')) {
                setIsOpenProfile(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpenProfile]);

    return (
        <div className="profile-dropdown-container">
            <div
                className='flex-container-center profile-pic'
                onClick={onClickCircle}
            >
                {user ? user.charAt(0).toUpperCase() 
                      : <img src={userPhoto} alt="user placeholder" />}
            </div>
            {isOpenProfile && (
                <div className="dropdown-menu-profile">
                    {!user ? (
                        <>
                            <p onClick={() => handleRedirect('/login')}>Iniciar Sesión</p>
                            <p onClick={() => handleRedirect('/signup')}>Crear Cuenta</p>
                        </>
                    ) : (
                        <>
                            <div className='view-pic-name'>
                                <div className='profile-pic'>
                                    {user.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p>{name}</p> {/* Nombre completo de ejemplo */}
                                    <p>{user}</p> {/* Email o nombre de usuario */}
                                </div>
                            </div>
                            <p onClick={() => handleRedirect(`/cuenta/${id}`)}>Mi Cuenta</p>
                            <p onClick={() => { logout(); setIsOpenProfile(false); }}>Cerrar Sesión</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}