import CardsCuenta from '../components/CardsCuenta';
import ManageCuenta from './ManageCuenta';
import Breadcrumb from '../components/BreadCrumb';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

export default function Cuenta() {
    return (
        <div className='container'>
            {/* <Breadcrumb /> */}
            <Routes>
                <Route path='/' element={
                    <>
                        <h1>Cuenta</h1>
                        <p>Ver Perfil</p>
                        <p>Nombre</p>
                        <CardsCuenta />
                    </>} />
                <Route path='administrar-cuenta/*' element={<ManageCuenta />} >
                </Route>
            </Routes>
        </div>
    );
}