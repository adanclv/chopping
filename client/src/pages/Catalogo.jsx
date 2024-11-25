import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import CardsProductos from "../components/CardsProductos";
import FilterSidebar from "../components/FilterSidebar";
import DetalleProducto from "./DetalleProducto";
import NotFound from "./NotFound";
import Breadcrumb from "../components/BreadCrumb";
import Footer from '../components/Footer';

export default function Catalogo() {
    return (
        <>
            <div className="container">
                <Routes>
                    <Route path="/" element={<InicioCatalogo />} />
                    <Route path="/:NoCategoria" element={<OrderCatalogo />} />
                    <Route path="/search/:Busqueda" element={<ResultsCatalogo />} />
                    <Route path="/:id/:nombreProducto" element={<DetalleProducto />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

const ResultsCatalogo = () => {
    const { Busqueda } = useParams();
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [responseProductos, responseCategorias] = await Promise.all([
                    fetch(`http://localhost:5000/api/productosBusqueda/${Busqueda}`),
                    fetch('http://localhost:5000/api/categoriasSB')
                ]);

                if (!responseProductos.ok || !responseCategorias.ok) {
                    throw new Error("Error al obtener datos");
                }

                const productosData = await responseProductos.json();
                const categoriasData = await responseCategorias.json();

                setProductos(productosData);
                setCategorias(categoriasData);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        }

        fetchData();
    }, [Busqueda]);

    const handleOrderByCategoria = (categoria) => {
        fetch(`http://localhost:5000/api/productos/${categoria}`)
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(err => console.error('Error al buscar productos:', err));
        
        navigate(`/catalogo/${categoria}`);
    }

    const handleOrder = (ordenarBy) => {
        const sortProductos = {
            menor: (a, b) => a.PrecioVenta - b.PrecioVenta,
            mayor: (a, b) => b.PrecioVenta - a.PrecioVenta,
            nombre: (a, b) => a.NombProducto.localeCompare(b.NombProducto)
        };

        const productosOrdenados = [...productos].sort(sortProductos[ordenarBy]);
        setProductos(productosOrdenados);
    }

    const handlerResetFilter = () => {
        fetch('http://localhost:5000/api/productos')
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(err => console.error('Error al buscar productos:', err));
    }


    return (
        <>
            <Breadcrumb name={["Inicio"]} paths={[`/`]} />
            <div className="main-productos">
                <FilterSidebar resultados={productos.length} categorias={categorias} byCategory={handleOrderByCategoria} order={handleOrder} reset={handlerResetFilter} />
                <div className="catalogo-productos">
                    {productos.length === 0 && <h2>Sin resultados</h2>}
                    <div className="grid-productos">
                        <CardsProductos productos={productos} bg={true} />
                    </div>
                </div>
            </div>
        </>

    );

};

const OrderCatalogo = () => {
    const { NoCategoria } = useParams();
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [responseProductos, responseCategorias] = await Promise.all([
                    fetch(`http://localhost:5000/api/productos/${NoCategoria}`),
                    fetch('http://localhost:5000/api/categoriasSB')
                ]);

                if (!responseProductos.ok || !responseCategorias.ok) {
                    throw new Error("Error al obtener datos");
                }

                const productosData = await responseProductos.json();
                const categoriasData = await responseCategorias.json();

                setProductos(productosData);
                setCategorias(categoriasData);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        }

        fetchData();
    }, []);

    const handleOrderByCategoria = (categoria) => {
        fetch(`http://localhost:5000/api/productos/${categoria}`)
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(err => console.error('Error al buscar productos:', err));
        
        navigate(`/catalogo/${categoria}`);
    }

    const handleOrder = (ordenarBy) => {
        const sortProductos = {
            menor: (a, b) => a.PrecioVenta - b.PrecioVenta,
            mayor: (a, b) => b.PrecioVenta - a.PrecioVenta,
            nombre: (a, b) => a.NombProducto.localeCompare(b.NombProducto)
        };

        const productosOrdenados = [...productos].sort(sortProductos[ordenarBy]);
        setProductos(productosOrdenados);
    }

    const handlerResetFilter = () => {
        navigate('/catalogo');
    }

    return (
        <>
            <Breadcrumb name={["Inicio"]} paths={[`/`]} />
            <div className="main-productos">
                <FilterSidebar resultados={productos.length} categorias={categorias} byCategory={handleOrderByCategoria} order={handleOrder} reset={handlerResetFilter} />
                <div className="catalogo-productos">
                    <div className="grid-productos">
                        <CardsProductos productos={productos} bg={true} />
                    </div>
                </div>
            </div>
        </>
    );
};

const InicioCatalogo = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [responseProductos, responseCategorias] = await Promise.all([
                    fetch('http://localhost:5000/api/productos'),
                    fetch('http://localhost:5000/api/categoriasSB')
                ]);

                if (!responseProductos.ok || !responseCategorias.ok) {
                    throw new Error("Error al obtener datos");
                }

                const productosData = await responseProductos.json();
                const categoriasData = await responseCategorias.json();

                setProductos(productosData);
                setCategorias(categoriasData);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        }

        fetchData();
    }, []);

    const handleOrderByCategoria = (categoria) => {
        fetch(`http://localhost:5000/api/productos/${categoria}`)
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(err => console.error('Error al buscar productos:', err));
        
        navigate(`/catalogo/${categoria}`);
    }

    const handleOrder = (ordenarBy) => {
        const sortProductos = {
            menor: (a, b) => a.PrecioVenta - b.PrecioVenta,
            mayor: (a, b) => b.PrecioVenta - a.PrecioVenta,
            nombre: (a, b) => a.NombProducto.localeCompare(b.NombProducto)
        };

        const productosOrdenados = [...productos].sort(sortProductos[ordenarBy]);
        setProductos(productosOrdenados);
    }

    const handlerResetFilter = () => {
        fetch('http://localhost:5000/api/productos')
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(err => console.error('Error al buscar productos:', err));
    }


    return (
        <>
            <Breadcrumb name={["Inicio"]} paths={[`/`]} />
            <div className="main-productos">
                <FilterSidebar resultados={productos.length} categorias={categorias} byCategory={handleOrderByCategoria} order={handleOrder} reset={handlerResetFilter} />
                <div className="catalogo-productos">
                    <div className="grid-productos">
                        <CardsProductos productos={productos} bg={true} />
                    </div>
                </div>
            </div>
        </>

    );
};