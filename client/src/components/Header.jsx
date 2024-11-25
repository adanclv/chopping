import '../styles/Header.css';
import ProfilePhoto from './ProfilePhoto';
import chopoImg from '../assets/chopo.png';
import { Link } from 'react-router-dom';
import React from 'react';
import BarraBusqueda from './BarraBusqueda';

export default function Header({ username, id, name, onLogout }) {
    return (
        <header className="grid-container">
            <div className='flex-justify-space-between'>
                <div className='flex-container-center logo-margin'>
                    <Link to="/" className="nav-link">
                        <img src={chopoImg} alt="Chopo" className="chopo-image" />
                    </Link>
                    <Link to="/" className="nav-link">
                        <h1 className="chopping-title">Chopping</h1>
                    </Link>
                </div>
                <div className="flex-container-center" >
                    <BarraBusqueda />
                    <ProfilePhoto user={username} id={id} name={name} logout={onLogout} />
                </div>
            </div>
        </header>
    );
}