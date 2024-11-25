import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../styles/Admin.css';
import Proveedores from './admin/Proveedores';
import Categorias from './admin/Categorias';
import Usuarios from './admin/Usuarios';
import Sidebar from '../components/admin/Sidebar';
import FormProveedores from '../components/admin/FormProveedores';

export default function Admin() {
    return (
        <>
        <Sidebar />
        <Routes>
            <Route path='/' element={ <Inicio />} />
            <Route path='/proveedores/*' element={<Proveedores />}/>
            <Route path='/categorias/*' element={<Categorias />}/>
            <Route path='/usuarios' element={<Usuarios />}/>
        </Routes>
        </>
    );
}

const Inicio = () => {
    return (
        <div className='main-content'>
            <h1>Bienvenido al Panel de Administración</h1>
            <p>Este es el contenido principal de la página.</p>
        </div>
    );
}