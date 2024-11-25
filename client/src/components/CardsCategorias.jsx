import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CardsCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/categoriasHome')
            .then(response => response.json())
            .then(data => setCategorias(data))
            .catch(err => console.error('Error al buscar categorias:', err));
    }, []);

    const handleOrderByCategoria = (categoria) => {
        fetch(`http://localhost:5000/api/productos/${categoria}`)
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(err => console.error('Error al buscar productos:', err));
        
        navigate(`/catalogo/${categoria}`);
    }

    return (
        <>
            <section className='categorias'>
                {categorias.map(categoria => (
                    <div key={categoria.NoCategoria} 
                        className="categoria"
                        onClick={() => handleOrderByCategoria(categoria.NoCategoria)}
                        >
                        <img src={`/assets/${categoria.ImgCategoria}`} alt={`${categoria.ImgCategoria} img`} />
                        <p className="highlighted-text">{categoria.NombCategoria}</p>
                    </div>
                ))}
            </section>
        </>
    );
}