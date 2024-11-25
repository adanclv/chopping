import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import TablaProveedor from '../../components/admin/TablaProveedor';
import FormProveedores from '../../components/admin/FormProveedores';

export default function Proveedores() {
    return (
        <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/create' element={<FormProveedores />} />
            <Route path='/edit/:id' element={<FormProveedores />} />
        </Routes>
    );
}

const Inicio = () => {
    const [proveedores, setProveedores] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredProveedores, setFilteredProveedores] = useState([]);
    const [filter, setFilter] = useState('todos');

    useEffect(() => {
        fetch('http://localhost:5000/api/proveedores')
            .then(response => response.json())
            .then(data => {
                setProveedores(data);
                setFilteredProveedores(data);
            })
            .catch(error => console.error('Error al buscar proveedores:', error));
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
        let filtered = [...proveedores];

        if (search) {
            filtered = filtered.filter(proveedor =>
                proveedor.NombProveedor.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filter !== 'todos') {
            filtered = filtered.filter(proveedor => proveedor.Estado === filter);
        }

        setFilteredProveedores(filtered);
    }, [search, filter, proveedores]);

    return (
        <div className='main-content'>
            <div className='flex-justify-space-between'>
                <h1>Proveedores</h1>
                <Link to={'/admin/proveedores/create'} className='flex-container-center btn-create'>
                    Crear Proveedor
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
                        <option value="todos">Todos</option>
                        <option value="activo">Solo activos</option>
                        <option value="inactivo">Solo inactivos</option>
                    </select>
                </div>
            </div>

            {proveedores.length === 0 ? <p>No hay proveedores registrados.</p>
                : (search || filter !== 'todos') && filteredProveedores.length === 0 ? <p>No se encontraron proveedores.</p>
                    : <TablaProveedor proveedores={filteredProveedores} />
            }
        </div>
    );
};