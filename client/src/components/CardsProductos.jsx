import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardsProductos({ productos, quantity, bg }) {
    const navigate = useNavigate();

    if (!productos || !Array.isArray(productos)) return <p>No hay productos disponibles.</p>;

    const showNum = quantity ? quantity : productos.length;

    const handleClick = (name, code) => {
        const encodedName = encodeURIComponent(name.toLowerCase().replace(/ /g, "-"));

        navigate(`/catalogo/${code}/${encodedName}`);
    };

    return (
        <>
            {productos.slice(0, showNum).map(producto => {
                return (
                    <div className={"content-grid" + (bg ? " bg-producto" : "")}
                        key={producto.CodigoProducto}
                        onClick={() => handleClick(producto.NombProducto, producto.CodigoProducto)}>
                        <img src={`/assets/${producto.ImgProducto}.jpg`}
                            alt={`${producto.ImgProducto} img`} />
                        <p className="name-producto highlighted-text">{
                            quantity
                                ? producto.NombProducto.length > 35 ? `${producto.NombProducto.slice(0, 35)}...` : producto.NombProducto
                                : producto.NombProducto
                        }</p>
                        <p className="price-producto">${producto.PrecioVenta}</p>
                    </div>
                );
            })}
        </>
    );
}