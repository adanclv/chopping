import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import chopoImg from '../assets/chopo.png';
import '../styles/Sign.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log('Logging in with', email, password);

    //     // Aquí puedes agregar la lógica de autenticación
    //     const isLoggedIn = true; // Actualiza esto con tu lógica de autenticación real

    //     if (isLoggedIn) {
    //         navigate('/');
    //     } else {
    //         alert('Error al iniciar sesión');
    //     }
    // };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('id', data.id);
                navigate('/');
                console.log('Inicio de sesión exitoso:', data);
            } else {
                const errorData = await response.json();
                alert(`Error al iniciar sesión: ${errorData.message}`);
            }  
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error de red al iniciar sesión');
        }
    };


    return (
        <div className='container-sign'>
            <header>
                <h1>Chopping</h1>
            </header>
            <div className="form-container">
                <img src={chopoImg} alt="Chopo" className="img-chopo" />
                <h2>INICIAR SESIÓN</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-btn">Iniciar Sesión</button>
                </form>
                <p className="terms-text">
                    Al continuar, aceptas las <a href="#">Condiciones de Uso</a> y el <a href="#">Aviso de Privacidad</a> de Chopping.
                </p>
                <p className="register-text">
                    ¿Eres nuevo? <Link to="/signup">Regístrate</Link>
                </p>
            </div>
            <footer>© 2023-2024, Chopping, Inc. o sus afiliados</footer>
        </div>
    );
}

export default Login;