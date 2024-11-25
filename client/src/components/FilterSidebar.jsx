import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FilterSidebar({ resultados, categorias, byCategory, order, reset }) {
    const { NoCategoria} = useParams();
    const [isOrderByCategory, setIsOrderByCategory] = useState(0);
    const [isOrder, setIsOrder] = useState('');


    useEffect(() => {
        if (NoCategoria) {
            setIsOrderByCategory(Number(NoCategoria));
        }
    }, [NoCategoria]);

    const unselect = () => {
        setIsOrderByCategory(0);
        setIsOrder('');
    }

    return (
        <aside className="filter-sidebar">
            <section className="total-resultados">
                <h2>Catálogo</h2>
                <p>{resultados} resultados</p>
            </section>
            <section className="filters">
                <h3>Categorías</h3>
                <ul>
                    {categorias.map(categoria => (
                        <li key={categoria.NoCategoria}
                            className={"highlighted-text" + (isOrderByCategory === categoria.NoCategoria ? " selected-filter" : "")}
                            onClick={() => {
                                byCategory(categoria.NoCategoria)
                                setIsOrderByCategory(categoria.NoCategoria)
                            }}>
                            {`${categoria.NombCategoria} (${categoria.NumProductos})`}
                        </li>
                    ))}
                </ul>
                <h3>Ordenar por</h3>
                <ul>
                    <li className={"highlighted-text" + (isOrder === 'menor' ? " selected-filter" : "")}
                        onClick={() => {
                            order('menor')
                            setIsOrder('menor')
                        }}>
                        Menor precio
                    </li>
                    <li className={"highlighted-text" + (isOrder === 'mayor' ? " selected-filter" : "")}
                        onClick={() => {
                            order('mayor')
                            setIsOrder('mayor')
                        }}>
                        Mayor precio
                    </li>
                    <li className={"highlighted-text" + (isOrder === 'nombre' ? " selected-filter" : "")}
                        onClick={() => {
                            order('nombre')
                            setIsOrder('nombre')
                        }}>
                        Nombre
                    </li>
                </ul>
                {(isOrderByCategory || isOrder) &&
                    <button onClick={() => {
                        reset()
                        unselect()
                    }}>
                        Limpiar filtros
                    </button>
                }
            </section>
        </aside>
    );
}