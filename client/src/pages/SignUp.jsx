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
    // const [verificationCode, setVerificationCode] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
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

            if (response.ok) {
                // const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
                // setVerificationCode(generatedCode);
                setIsRegistered(true);
                // alert(`Usuario registrado con éxito. Tu código de verificación es: ${generatedCode}`);
                alert('Usuario registrado con éxito.');
            } else {
                const errorData = await response.json();
                alert(`Error al registrar usuario: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            // setMessage('Error de red al registrar usuario');
            alert('Error de red al registrar usuario');
        }
    };

    const handleContinue = () => {
        navigate('/login');
        // navigate('/verification', { state: { verificationCode } });
    };

    return (
        <div className='container-sign'>
            <header>
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
                        <button className='submit-btn' type="submit">Registrar</button>
                    </form>
                    {isRegistered && (
                        <div>
                            <p>Usuario registrado con éxito. </p>
                            <button className='submit-btn' onClick={handleContinue}>Continuar</button>
                        </div>
                    )}
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