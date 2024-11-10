import React from 'react';

export default function TablaProveedor() {
    return (
        <div className="container-table">
            <div className="tabla header-tabla">
                <p>Id</p>
                <p>Nombre</p>
                <p>Email</p>
                <p>Telefono</p>
                <p></p>
            </div>


            <div className="tabla content-tabla">
                <p>777</p>
                <p>Adan Clemente</p>
                <p>adan@correo.com</p>
                <p>8334441372</p>
                <div className="btn-action">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
                            <path d="M3 17.25V21h3.75l12.23-12.23-3.75-3.75L3 17.25zm16.61-9.61c.39-.39.39-1.02 0-1.41l-2.81-2.81c-.39-.39-1.02-.39-1.41 0L14.49 6.74l3.75 3.75 4.37-4.37z" fill="currentColor" />
                        </svg>
                    </button>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
                            <path d="M3 6h18v2H3zm3 3h12v12c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1V9zm6 9h-2v-4h2zm0-6h-2V7h2z" fill="currentColor" />
                        </svg>

                    </button>
                </div>
            </div>
            <div className="tabla content-tabla">
                <p>999</p>
                <p>Amando Hernandez</p>
                <p>amando@correo.com</p>
                <p>8331241323</p>
                <div className="btn-action">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
                            <path d="M3 17.25V21h3.75l12.23-12.23-3.75-3.75L3 17.25zm16.61-9.61c.39-.39.39-1.02 0-1.41l-2.81-2.81c-.39-.39-1.02-.39-1.41 0L14.49 6.74l3.75 3.75 4.37-4.37z" fill="currentColor" />
                        </svg>
                    </button>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
                            <path d="M3 6h18v2H3zm3 3h12v12c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1V9zm6 9h-2v-4h2zm0-6h-2V7h2z" fill="currentColor" />
                        </svg>

                    </button>
                </div>
            </div>

        </div>
    );
}