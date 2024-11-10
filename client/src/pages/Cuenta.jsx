import CardsCuenta from '../components/CardsCuenta';
import ManageCuenta from './ManageCuenta';
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

export default function Cuenta() {
    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={
                    <>
                        <h1>Cuenta</h1>
                        <CardsCuenta />
                    </>} />
                <Route path='administrar-cuenta' element={<>
                    
                    <ManageCuenta />
                </>} />
            </Routes>
        </div>
    );
}