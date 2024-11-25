import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import TablaCategorias from "../../components/admin/TablaCategorias";
import FormCategorias from "../../components/admin/FormCategorias";

export default function Categorias() {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/create" element={<FormCategorias />} />
            <Route path="/edit/:id" element={<FormCategorias />} />
        </Routes>
    );
}

const Inicio = () => {
    const [categorias, setCategorias] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCategorias, setFilteredCategorias] = useState([]);
    const [filter, setFilter] = useState('todos');

    useEffect(() => {
        fetch('http://localhost:5000/api/categorias')
            .then(response => response.json())
            .then(data => {
                setCategorias(data)
                setFilteredCategorias(data)
            })
            .catch(error => console.error('Error al buscar categorias:', error));
    }, []);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
    };

    const handleFilterChange = (e) => {
        const filterValue = e.target.value;
        setFilter(filterValue);
    };

    useEffect(() => {
        let filtered = [...categorias];

        if (search) {
            filtered = filtered.filter(categoria =>
                categoria.NombCategoria.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filter !== 'todos') {
            filtered = filtered.filter(categoria => categoria.Estado === filter);
        }

        setFilteredCategorias(filtered);
    }, [search, filter, categorias]);

    return (
        <div className="main-content">
            <div className="flex-justify-space-between">
                <h1>Categorias</h1>
                <Link to={'/admin/categorias/create'} className="flex-container-center btn-create">
                    Crear Categoria
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor" />
                    </svg>
                </Link>
            </div>
            <div className='flex-justify-space-between search'>
                <input className='fsize-12' type="text" placeholder='Buscar' onChange={handleSearchChange} />
                <div className='flex-container-center filter-estado'>
                    <p>Visualizar:</p>
                    <select value={filter} onChange={handleFilterChange}>
                        <option value="todos">Todas</option>
                        <option value="activo">Solo activas</option>
                        <option value="inactivo">Solo inactivas</option>
                    </select>
                </div>
            </div>

            {categorias.length === 0 ? <p>No hay categorias registradas.</p>
                : (search || filter !== 'todos') && filteredCategorias.length === 0 ? <p>No se encontraron categorias.</p>
                    : <TablaCategorias categorias={filteredCategorias} />
            }
        </div>
    );
};