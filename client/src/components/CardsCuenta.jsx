import micuenta from '../assets/micuenta.png';
import miscompras from '../assets/miscompras.png';
import membresia from '../assets/membresia.png';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CardsCuenta() {
    const { id } = useParams();

    return (
        <div className='cuenta-cards'>
            <CardCuenta 
                icon={miscompras}
                title="Mis Compras"
                description="Consultar compras en tienda"
                id={id}
                path="miscompras"
            />
            <CardCuenta 
                icon={micuenta}
                title="Mi Cuenta"
                description="Cambiar correo electrónico, contraseña y numero de teléfono"
                id={id}
                path="administrar-cuenta"
            />
            <CardCuenta 
                icon={membresia}
                title="Membresia"
                description="Administra tu membresia y consulta tus beneficios"
                id={id}
                path="administrar-membresia"
            />
        </div>
    );
}

function CardCuenta({ icon, title, description, id, path }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/cuenta/${id}/${path}`);
    };

    return (
        <div className="cuenta-card" onClick={handleClick}>
            <div className="card-icon">
                <img src={icon} alt={`${icon} icon`} />
            </div>
            <div className="card-content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}