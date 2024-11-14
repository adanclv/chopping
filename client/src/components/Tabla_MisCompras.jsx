import React, { useState } from 'react';

export default function Tabla_MisCompras() {
    const [popUp, setPopUp] = useState(false);

    const handlePopUp = () => {
        setPopUp(!popUp);
    };

    return (<>
        {popUp &&
            <div className='shadow-popUp' onClick={handlePopUp}>
                <div className='popUp'>
                    <div className='title-compra'>
                        <h2>Compra #777</h2>
                        <button onClick={handlePopUp}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="4" y1="4" x2="20" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
                                <line x1="20" y1="4" x2="4" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="table-compras hTabla">
                        <p>Cantidad</p>
                        <p>Descripcion</p>
                        <p>Precio Unit</p>
                        <p>Total</p>
                    </div>
                    <div className="table-compras">
                        <p>12</p>
                        <p>Doritos Dinamita</p>
                        <p>$32.23</p>
                        <p>$386.76</p>
                    </div>
                    <div className="table-compras">
                        <p>1</p>
                        <p>Coca-Cola Sin Azucar 2.5L</p>
                        <p>$29.00</p>
                        <p>$29.00.</p>
                    </div>
                    <div>
                        <h3>Sum. Total: $415.76</h3>
                    </div>
                </div>
            </div>}
        <div className='container container-table'>
            <div className="table-compras hTabla">
                <p>Id</p>
                <p>Fecha</p>
                <p>Hora</p>
                <p>Total</p>
                <p></p>
            </div>
            <div className="table-compras">
                <p>777</p>
                <p>11/11/2024</p>
                <p>12:30</p>
                <p>$3201.23</p>
                <button onClick={handlePopUp}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="black" stroke-width="2" />
                        <line x1="12" y1="16" x2="12" y2="12" stroke="black" stroke-width="2" stroke-linecap="round" />
                        <circle cx="12" cy="8" r="1" fill="black" />
                    </svg>
                </button>
            </div>
            <div className="table-compras">
                <p>666</p>
                <p>12/11/2024</p>
                <p>14:23</p>
                <p>$100.00</p>
                <button onClick={handlePopUp}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="black" stroke-width="2" />
                        <line x1="12" y1="16" x2="12" y2="12" stroke="black" stroke-width="2" stroke-linecap="round" />
                        <circle cx="12" cy="8" r="1" fill="black" />
                    </svg>
                </button>
            </div>

        </div>
    </>
    );
}