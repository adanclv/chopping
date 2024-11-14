import CardsCuenta from '../components/CardsCuenta';
import ManageCuenta from './ManageCuenta';
import Breadcrumb from '../components/BreadCrumb';
import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import Compras from './Compras';
import Membresia from './Membership';

export default function Cuenta() {
    const { id } = useParams();
    return (
        <div className='container'>
            {/* <Breadcrumb name={"Cuenta"} paths={[`/cuenta/${id}`]}/> */}
            <Routes>
                <Route path='/' element={<InicioCuenta />} />
                <Route path='administrar-cuenta/*' element={<ManageCuenta />} />
                <Route path='administrar-membresia/*' element={<Membresia />} />
                <Route path='miscompras' element={<Compras />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

const InicioCuenta = () => {
    return (
        <>
            <h1>Cuenta</h1>
            <section className='info-gral'>
                <h2>Información General</h2>
                <div className='algo'>
                <p>Nombre: John Doe</p>
                <p>Correo: correo@correo.com</p>
                <p>Domicilio: Calle Falsa 123</p>
                <p>Telefono: 8331231212</p>
                </div>
                
            </section>

            <CardsCuenta />
        </>
    );
};