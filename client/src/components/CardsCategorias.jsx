import React, { useEffect, useState } from "react";
import tech from '../assets/tech.png'

export default function CardsCategorias() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/categorias')
            .then(response => response.json())
            .then(data => setCategorias(data))
            .catch(err => console.error('Error al buscar categorias:', err));
    }, []);

    return (
        <>
            <section className='categorias'>
                {categorias.map(categoria => (
                    <>
                    <div key={categoria.NoCategoria} className="categoria">
                        <img src={tech} alt="tech" />
                        {/* <p>{categoria.ImgCategoria}</p> */}
                        <p className="highlighted-text">{categoria.NombCategoria}</p>
                    </div>
                    </>
                ))}
            </section>
        </>
    );
}