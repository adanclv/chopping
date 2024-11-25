import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cuenta from './Cuenta';
import promo from '../assets/promo.jpeg';
import NotFound from './NotFound';
import CardsCategorias from '../components/CardsCategorias';
import CardsProductos from '../components/CardsProductos';
import Catalogo from './Catalogo';
import '../styles/Home.css';

export default function Home() {
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedId = localStorage.getItem('id');
        const storedName = localStorage.getItem('nombre');

        if (storedToken) setToken(storedToken);
        if (storedUsername) setUsername(storedUsername);
        if (storedId) setId(storedId);
        if (storedName) setName(storedName);


    }, []);


    const handleLogout = () => {
        setTimeout(() => {
            localStorage.clear();
            setToken('');
            setUsername('');
            setId('');
            setName('');
            navigate('/');
        }, 800);
    };

    return (
        <>
            <Header username={username} id={id} name={name} onLogout={handleLogout} />
            <Routes>
                <Route path='/' element={
                    <>
                        <PaginaInicio />
                    </>
                } />
                {token.length > 0
                    ? <Route path="/cuenta/:id/*" element={<Cuenta />} />
                    : <Route path="/" element={<h1>Buen intento pilluelo</h1>} />
                }
                <Route path="/catalogo/*" element={<Catalogo />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
            {/* <Footer /> */}

        </>



    );
}

const PaginaInicio = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/productos')
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(err => console.error('Error al buscar productos:', err));
    }, []);

    return (
        <>
            <div className="image-wrapper">
                <img src={promo} alt="promo" />
                <div className='gradient'></div>
            </div>
            <div className='container'>
                <CardsCategorias />
                <div className="productos-home">
                    <div className="productos-title-home">
                        <h2>Productos</h2>
                        <Link to={'/catalogo'}>Ver más</Link>
                    </div>
                    <div className="grid-productos-home">
                        <CardsProductos productos={productos} quantity={8} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};