import React from "react";
import samsungA54 from '../assets/samsungA54.jpg';

export default function ProductosHome() {

    return (
        <div className="productos-home">
            <h2>Productos</h2>
            <div className="grid-productos-home">
                <div className="content-grid">
                    <img src={samsungA54} alt="" />
                    <p className="name-producto">Celular Samsung Galaxy A54 128 GB Blanco</p>
                    <p className="price-producto">$5,169</p>
                </div>
                <div className="content-grid">
                    <img src={samsungA54} alt="" />
                    <p className="name-producto">Celular Samsung Galaxy A54 128 GB Blanco</p>
                    <p className="price-producto">$5,169</p>
                </div>
                <div className="content-grid">
                    <img src={samsungA54} alt="" />
                    <p className="name-producto">Celular Samsung Galaxy A54 128 GB Blanco</p>
                    <p className="price-producto">$5,169</p>
                </div>
                <div className="content-grid">
                    <img src={samsungA54} alt="" />
                    <p className="name-producto">Celular Samsung Galaxy A54 128 GB Blanco</p>
                    <p className="price-producto">$5,169</p>
                </div>
            </div>
        </div>
    );
}