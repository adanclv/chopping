import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import chopoImg from '../assets/chopo.png';
import '../styles/Sign.css';

export default function SignUp() {
    const [formData, setFormData] = useState({
        nombre_usuario: '',
        nombre: '',
        paterno: '',
        materno: '',
        email: '',
        contrasena: '',
        domicilio: '',
        telefono: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setTimeout(() => {
                    handleContinue();
                }, 1000);
            } else if (response.status === 500) {
                setMessage(data.message);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            setMessage('Error de red al registrar usuario');
        } finally {
            setMessage('');
        }
    };

    const handleContinue = () => {
        navigate('/login');
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className='container-sign'>
            <header onClick={handleBack}>
                <h1>Bienvenido a Chopping</h1>
            </header>
            <div className="form-container">
                <img className='img-chopo' src={chopoImg} alt="Chopo" />
                <h2>CREAR CUENTA</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="nombre_usuario" placeholder="Nombre de usuario" onChange={handleChange} required />
                    <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
                    <input type="text" name="paterno" placeholder="Apellido Paterno" onChange={handleChange} required />
                    <input type="text" name="materno" placeholder="Apellido Materno" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />
                    <input type="password" name="contrasena" placeholder="Contraseña" onChange={handleChange} required />
                    <input type="text" name="domicilio" placeholder="Domicilio" onChange={handleChange} required />
                    <input type="tel" name="telefono" placeholder="Telefono" onChange={handleChange} required />

                    {message && (
                        <div className='alerta'>
                            <p>{message}</p>
                        </div>
                    )}
                    <button className='submit-btn' type="submit">Registrar</button>
                </form>

                <p className='terms-text'>Al crear una cuenta, aceptas las <a href="/">Condiciones de Uso</a> y el <a href="/">Aviso de Privacidad</a> de Chopping.</p>
                <p className='register-text'>
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
            <footer>
                © 2023-2024, Chopping, Inc. o sus afiliados
            </footer>
        </div>
    );
}