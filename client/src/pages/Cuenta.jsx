import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import CardsCuenta from '../components/CardsCuenta';
import ManageCuenta from './ManageCuenta';
import Membresia from './Membership';
import NotFound from './NotFound';
import Compras from './Compras';


export default function Cuenta() {
    // const { id } = useParams();
    return (
        <div className='container'>
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
    const { id } = useParams();
    const [cliente, setCliente] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/api/getCliente/${id}`)
            .then(response => response.json())
            .then(data => setCliente(data.cliente));
    }, [id]);

    return (
        <>
            <h1>Cuenta</h1>
            <section className='info-gral'>
                <h2>Información General</h2>
                <div className='algo'>
                <p>{`Nombre: ${cliente.NombCliente} ${cliente.ApePatCliente} ${cliente.ApeMatCliente}`}</p>
                <p>{`Correo: ${cliente.MailCliente}`}</p>
                <p>{`Domicilio: ${cliente.DomCliente}`}</p>
                <p>{`Telefono: ${cliente.TelCliente}`}</p>
                </div>
            </section>

            <CardsCuenta />
        </>
    );
};