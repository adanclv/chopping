import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import '../styles/Admin.css';
import Proveedores from './admin/Proveedores';
import Usuarios from './admin/Usuarios';

export default function Admin() {
    const [selectedContent, setSelectedContent] = useState('inicio');

    // Función para renderizar el contenido según el estado
    const renderContent = () => {
        switch (selectedContent) {
            case 'inicio':
                return <Inicio />;
            case 'proveedores':
                return <Proveedores />;
            case 'usuarios':
                return <p>Gestión de Usuarios</p>;
            case 'configuracion':
                return <p>Configuración del Sistema</p>;
            default:
                return <Inicio />;
        }
    };

    const handleContentChange = (content) => (event) => {
        event.preventDefault();
        setSelectedContent(content);
    }

    const isActiveLink = (content) => selectedContent === content;

    return (
        <>
            <div className="sidebar">
                <h2>Chopping</h2>
                <ul>
                    <li>
                        <button className={isActiveLink('inicio') ? 'active' : ''} onClick={handleContentChange('inicio')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <path d="M12 3L3 10h2v8a1 1 0 001 1h4a1 1 0 001-1v-5h2v5a1 1 0 001 1h4a1 1 0 001-1v-8h2L12 3z" />
                            </svg>
                            Inicio
                        </button>
                    </li>
                    <li>
                        <button className={isActiveLink('proveedores') ? 'active' : ''} onClick={handleContentChange('proveedores')} >
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <circle cx="8" cy="8" r="3" />
                                <circle cx="16" cy="8" r="3" />
                                <path d="M4 18c0-2.5 2-4 4-4s4 1.5 4 4v1H4v-1z" />
                                <path d="M12 18c0-2.5 2-4 4-4s4 1.5 4 4v1h-8v-1z" />
                            </svg>
                            Proveedores
                        </button>
                    </li>
                    <li>
                        <button className={isActiveLink('usuarios') ? 'active' : ''} onClick={handleContentChange('usuarios')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <circle cx="12" cy="8" r="3" />
                                <path d="M7 18c0-2.5 2-4 5-4s5 1.5 5 4v1H7v-1z" />
                            </svg>
                            Usuarios
                        </button>
                    </li>
                    <li>
                        <button className={isActiveLink('inventario') ? 'active' : ''} onClick={handleContentChange('inventario')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <path d="M4 8l8-4 8 4-8 4-8-4z" />
                                <path d="M4 10v6l8 4v-6l-8-4z" />
                                <path d="M12 14v6l8-4v-6l-8 4z" />
                            </svg>
                            Inventario
                        </button>
                    </li>
                </ul>

                <div className='goback'>
                    
                    <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                        Regresar</Link>
                </div>
            </div>

            <div className="main-content">
                {renderContent()}

            </div>
            {/* <div class="main-content">
                <Routes>
                    <Route path="/" element={<>
                        <h1>Bienvenido al Panel de Administración</h1>
                        <p>Este es el contenido principal de la página.</p>
                    </>} />
                    <Route path="proveedores" element={<Proveedores />} />
                    <Route path="usuarios" element={<Usuarios />} />
                </Routes>
            </div> */}
        </>
    );
}

const Inicio = () => {
    return (
        <div>
            <h1>Bienvenido al Panel de Administración</h1>
            <p>Este es el contenido principal de la página.</p>
        </div>
    );
}