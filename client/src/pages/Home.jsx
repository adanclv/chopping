import Header from '../components/Header';
import Footer from '../components/Footer';
import Cuenta from './Cuenta';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import promo from '../assets/promo.jpeg';
import '../styles/Home.css';
import NotFound from './NotFound';
import CardsCategorias from '../components/CardsCategorias';
import ProductosHome from '../components/ProductosHome';

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
                        <div className="image-wrapper">
                            <img src={promo} alt="promo" />
                            <div className='gradient'></div>
                        </div>
                        <div className='container'>
                            <CardsCategorias />
                            <ProductosHome />
                        </div>
                        <Footer />
                    </>
                } />
                {token.length > 0
                    ? <Route path="/cuenta/:id/*" element={<Cuenta />} />
                    : <Route path="/" element={<h1>Buen intento pilluelo</h1>} />
                }
                <Route path="*" element={<NotFound />} />

            </Routes>
            {/* <Footer /> */}

        </>



    );
}