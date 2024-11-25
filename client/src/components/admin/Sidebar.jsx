import React from "react";
import { NavLink ,Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <h2>Chopping</h2>
                <ul>
                    <li>
                        <NavLink to={'/admin'} end className={({isActive}) => ( isActive ? 'active' : '')} >
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <path d="M12 3L3 10h2v8a1 1 0 001 1h4a1 1 0 001-1v-5h2v5a1 1 0 001 1h4a1 1 0 001-1v-8h2L12 3z" />
                            </svg>
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/admin/proveedores'} end className={({isActive}) => ( isActive ? 'active' : '')} >
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <circle cx="8" cy="8" r="3" />
                                <circle cx="16" cy="8" r="3" />
                                <path d="M4 18c0-2.5 2-4 4-4s4 1.5 4 4v1H4v-1z" />
                                <path d="M12 18c0-2.5 2-4 4-4s4 1.5 4 4v1h-8v-1z" />
                            </svg>
                            Proveedores
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/admin/categorias'} end className={({isActive}) => ( isActive ? 'active' : '')} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="6" cy="6" r="3" />
                                <rect x="12" y="4" width="8" height="4" rx="1" />
                                <rect x="4" y="12" width="4" height="8" rx="1" />
                                <polygon points="14,14 20,14 17,20" />
                            </svg>
                            Categorias
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/admin/usuarios'} className={({isActive}) => ( isActive ? 'active' : '')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <circle cx="12" cy="8" r="3" />
                                <path d="M7 18c0-2.5 2-4 5-4s5 1.5 5 4v1H7v-1z" />
                            </svg>
                            Usuarios
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/admin/inventario'} className={({isActive}) => ( isActive ? 'active' : '')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <path d="M4 8l8-4 8 4-8 4-8-4z" />
                                <path d="M4 10v6l8 4v-6l-8-4z" />
                                <path d="M12 14v6l8-4v-6l-8 4z" />
                            </svg>
                            Inventario
                        </NavLink>
                    </li>
                </ul>

                <div className='goback'>
                    <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Regresar</Link>
                </div>
            </div>
        </>
    );
}