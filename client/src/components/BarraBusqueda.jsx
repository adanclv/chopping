import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BarraBusqueda() {
    const [isOpen, setIsOpen] = useState(false);

    const [valor, setValor] = useState('');
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    const handleFocus = () => {    
        setIsOpen(true);
        console.log(isOpen);
    }
    
    const handleBlur = () => {
        setTimeout(() => {
            setIsOpen(false);
            console.log(isOpen);
        }, 200);
    };

    const fetchProductos = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/productosBusqueda/${valor}`);

            if (!response.ok) {
                throw new Error("Error al obtener datos");
            }

            const data = await response.json();

            setProductos(data);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    useEffect(() => {
        if (valor) {
            fetchProductos();
        } else {
            setProductos([]);
        }
    }, [valor]);

    const handleChange = (e) => {
        setValor(e.target.value);
    };

    const handleClick = (name, code) => {
        setValor('');
        const encodedName = encodeURIComponent(name.toLowerCase().replace(/ /g, "-"));
        navigate(`/catalogo/${code}/${encodedName}`);
        
    };

    const handleKeyDown = (e) => {
        if (valor && e.key === 'Enter') {
            setIsOpen(false);
            navigate(`/catalogo/search/${valor}`);
        }
    }

    return (
        <>
            <div className='search-input'>
                <input type="text" 
                    placeholder='Buscar...' 
                    value={valor} 
                    onChange={handleChange} 
                    onFocus={() => {setIsOpen(true)
                        console.log(isOpen);
                    }} 
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown} />
                <div className={"productos-encontrados " + (isOpen ? "drop-down-show" : "drop-down-hide")}>
                    <ul>
                        {(productos  ) && productos.map(producto => (
                            <li key={producto.CodigoProducto} onClick={() => handleClick(producto.NombProducto, producto.CodigoProducto)}>
                                {producto.NombProducto}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}