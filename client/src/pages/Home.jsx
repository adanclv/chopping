import Header from '../components/Header';
import Footer from '../components/Footer';
import Cuenta from './Cuenta';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import promo from '../assets/promo.jpeg';
import '../styles/Home.css';
import tech from '../assets/tech.png';

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
        const storedName = localStorage.getItem('name');

        if (storedToken) setToken(storedToken);
        if (storedUsername) setUsername(storedUsername);
        if (storedId) setId(storedId);
        if (storedName) setName(storedName);

        // console.log(token, username);
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
                        <section className='categorias'>
                            <div className='categoria'>
                                Hola
                                <img src={tech} alt="tecnologia" />
                            </div>
                            <div className='categoria'>
                                Hola
                                <img src={tech} alt="tecnologia" />
                            </div>
                            <div className='categoria'>
                                Hola
                                <img src={tech} alt="tecnologia" />
                            </div>
                            <div className='categoria'>
                                Hola
                                <img src={tech} alt="tecnologia" />
                            </div>
                            <div className='categoria'>
                                Hola
                                <img src={tech} alt="tecnologia" />
                            </div>
                            <div className='categoria'>
                                Hola
                                <img src={tech} alt="tecnologia" />
                            </div>
                        </section>
                    </>
                } />
                <Route path="/cuenta/:id/*" element={<Cuenta />} />

            </Routes>
            {/* <Footer /> */}

        </>



    );
}