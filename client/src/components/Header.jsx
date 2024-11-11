import '../styles/Header.css';
import ProfilePhoto from './ProfilePhoto';
import chopoImg from '../assets/chopo.png';
import buscarImage from '../assets/buscar.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function Header({ username, id, name, onLogout }) {
    const [selectedOption, setSelectedOption] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { value: 'opcion1', label: 'Opción 1' },
        { value: 'opcion2', label: 'Opción 2' },
        { value: 'opcion3', label: 'Opción 3' },
    ];

    const handleOptionClick = (value) => {
        setSelectedOption(value);
        setIsOpen(false); // Cierra el dropdown al seleccionar una opción
    };    

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
                    <input type="text" placeholder="Buscar productos..." className="search-input" />
                    <div className='container-icon'>
                        <img src={buscarImage} alt="Buscar" className="search-icon" />
                    </div>
                    <ProfilePhoto user={username} id={id} name={name} logout={onLogout}/>
                </div>


            </div>

            {/* <div className='container-nav'>
                <nav className="header-nav">
                    {!token && 
                        <>
                        <Link to="../signup" className='nav-link'>Crear Cuenta</Link>
                        <Link to="../login" className="nav-link">Ingresar</Link>
                        </>
                    }
                    <Link to="../products" className="nav-link">Productos</Link>
                    <div className="nav-link custom-dropdown" onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}>
                        <span>
                            Categorias
                        </span>
                        {isOpen && (
                            <div className="dropdown-menu">
                                {options.map((option) => (
                                    <div
                                        key={option.value}
                                        className="dropdown-item"
                                        onClick={() => handleOptionClick(option.value)}
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link to="../" className="nav-link">Promociones</Link>
                    <Link to="../" className="nav-link">Lo más vendidos</Link>
                </nav>
            </div> */}

            {/* <div>
                <nav className="account-nav">
                    <Link to="/" className="nav-link">Crear Cuenta</Link>
                    <Link to="/login" className="nav-link">Ingresar</Link>
                    <Link to="/categories" className="nav-link">Categorías</Link>
                    <span style={{ fontWeight: 'bold', color: '#00BFFF' }}>Mi Cuenta</span>
                    <Link to="/promotions" className="nav-link">Promociones</Link>
                    <Link to="/best-sellers" className="nav-link">Lo más vendidos</Link>
                    <Link to="/products" className="nav-link">Productos</Link>
                    <span onClick={handleHelpClick} style={{ cursor: 'pointer', color: '#00BFFF', fontWeight: 'bold' }} className="nav-link">Ayuda</span>
                </nav>
            </div> */}

            {/* {showHelpInfo && (
                <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f1f1f1', marginTop: '20px', borderRadius: '5px' }}>
                    <h2>Ayuda</h2>
                    <p>En <strong>Chopping</strong>, estamos aquí para ayudarte. Si tienes alguna pregunta o necesitas asistencia, puedes contactar a nuestro equipo de soporte a través de:</p>
                    <p><strong>Teléfono:</strong> 123-456-7890</p>
                    <p><strong>Correo electrónico:</strong> soporte@chopping.com</p>
                    <p>¡No dudes en contactarnos para cualquier consulta!</p>
                </div>
            )} */}
        </header>

    );
}