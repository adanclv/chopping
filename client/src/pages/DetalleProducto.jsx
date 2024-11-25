import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardsProductos from "../components/CardsProductos";
import Breadcrumb from "../components/BreadCrumb";

export default function DetalleProducto() {
    const { id } = useParams();
    const [producto, setProducto] = useState({});
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/producto/${id}`);

                if (!response.ok) {
                    throw new Error("Error al obtener datos");
                }

                const productoData = await response.json();
                setProducto(productoData);
                console.log(productoData);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        }

        fetch('http://localhost:5000/api/productos')
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(err => console.error('Error al buscar productos:', err));

        fetchData();
    }, [id]);

    const descripcion = Array.isArray(producto.DescProducto)
        ? producto.DescProducto
        : typeof producto.DescProducto === "string"
            ? producto.DescProducto.split(";")
            : ["No hay descripción disponible."];

    const stock = producto.StockProducto === 0
        ? "No disponible"
        : producto.StockProducto > 0 && producto.StockProducto <= 5
            ? "Pocas unidades disponibles"
            : "Disponible";


    return (
        <div className="detalle-producto">
            <Breadcrumb name={["Inicio", "Catalogo"]} paths={[`/`, "/catalogo"]} />
            <div className="content-producto-detalle">
                <img src={`/assets/${producto.ImgProducto}.jpg`} alt={`${producto.ImgProducto} img`} />
                <div className="producto-detalle">
                    <h2 className="titulo-producto">{producto.NombProducto}</h2>
                    <p className="ct-gray">{`Código de producto: ${producto.CodigoProducto}`}</p>
                    <p className="ct-gray">Vendido por <span className="w-bold">Chooping</span></p>
                    <p className="precio-producto">${producto.PrecioVenta}</p>
                    <p className="ct-gray stock-producto">{stock}</p>
                    <p className="w-bold">Descripción del producto:</p>
                    <ul className="descripcion-producto">
                        {descripcion.map((desc, index) => <li key={index}>{desc}</li>)}
                    </ul>
                </div>
            </div>
            <div className="grid-productos">
                <CardsProductos productos={productos.filter(prod => prod.CodigoProducto !== producto.CodigoProducto)} quantity={4} bg={true} />
            </div>
        </div>
    );
}