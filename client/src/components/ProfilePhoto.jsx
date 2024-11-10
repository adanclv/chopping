import '../styles/Profile.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userPhoto from '../assets/user.png';

export default function ProfilePhoto({ user, id, logout }) {
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const navigate = useNavigate();

    const onClickCircle = () => {
        setIsOpenProfile(!isOpenProfile);
    };

    const handleCuenta = () => {
        navigate(`/cuenta?id=${id}`);
        closeProfile();
    };

    const closeProfile = () => {
        setIsOpenProfile(false);
    }

    return (
        <>
            <div className='flex-container-center profile-pic' onClick={onClickCircle}>
                {user ? user.charAt(0)
                    : <img src={userPhoto} alt="userplaceholder" />}
            </div>
            {isOpenProfile && <div className="dropdown-menu-profile">
                {!user &&
                    <>
                        <p onClick={() => navigate('/login')}>Iniciar Sesión</p>
                        <p onClick={() => navigate('/signup')}>Crear Cuenta</p>
                    </>
                }
                {user &&
                    <>
                        <div className='view-pic-name'>
                            <div className='profile-pic'>
                                {user.charAt(0)}
                            </div>
                            <div>
                                <p>Adan Clemente</p>
                                <p>{user}</p>
                            </div>
                        </div>
                        <p onClick={handleCuenta}>Mi Cuenta</p>
                        {/* <p>Configuración</p> */}
                        {/* <p>Hazte socio</p> */}
                        <p onClick={() => {logout(); closeProfile();}}>Cerrar Sesión</p>
                    </>
                }

            </div>}
        </>
    );
}