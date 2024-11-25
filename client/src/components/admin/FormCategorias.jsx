import React, { useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { useNavigate, useParams } from "react-router-dom";
import UploadImage from "./UploadImage";

export default function FormCategorias() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        imagen: '',
        estado: ''
    });
    const [message, setMessage] = useState({
        msg: '',
        type: ''
    });

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/categorias/${id}`);
                    const data = await response.json();
                    if (response.ok) {
                        setFormData({
                            nombre: data.NombCategoria,
                            descripcion: data.DescCategoria,
                            imagen: data.ImgCategoria,
                            estado: data.Estado
                        });
                    } else {
                        setMessage({ msg: data.msg, type: 'error' });
                    }
                } catch (error) {
                    setMessage({ msg: 'Error al cargar los datos de la categoria', type: 'error' });
                }
            };
            fetchData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nombre || !formData.descripcion) {
            setMessage({ msg: "Todos los campos son obligatorios.", type: "error" });
            return;
        }

        try {
            const response = await fetch(id ? `http://localhost:5000/api/categorias/update/${id}`
                : 'http://localhost:5000/api/categorias/create', {
                method: id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({
                    msg: id ? 'Categoria actualizada con éxito'
                        : 'Categoria creada con éxito', type: 'success'
                });
                setTimeout(() => {
                    clearData();
                    navigate('/admin/categorias');
                }, 2000);
            } else {
                setMessage({ msg: data.msg, type: 'error' });
            }
        }
        catch (error) {
            setMessage({ msg: 'Error al crear categoria', type: 'error' });
        }
    }

    const clearData = () => {
        setFormData({
            nombre: '',
            descripcion: '',
            imagen: '',
            estado: ''
        });

        setMessage({
            msg: '',
            type: ''
        });
    }

    const handleCancel = () => {
        clearData();
        navigate('/admin/categorias');
    }

    return (
        <div className="main-content">
            <Breadcrumbs breadcrumbs={[
                { label: 'Categorias', href: '/admin/categorias' },
                { label: 'Crear Categoria', href: '/admin/categorias/create', active: true }
            ]} />
            <div className="flex-column-start m-20">
                <form onSubmit={handleSubmit} className="form-admin">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        value={formData.nombre}
                        name="nombre"
                        placeholder="Nombre"
                        id="nombre"
                        onChange={handleChange} />

                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea
                        name="descripcion"
                        id="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        placeholder="Descripción"
                    ></textarea>

                    <label htmlFor="imagen">Imagen:</label>
                    <UploadImage />                   

                    {id &&
                        <>
                            <label htmlFor="estado">Estado:</label>
                            <select name="estado" id="estado" value={formData.estado} onChange={handleChange}>
                                <option value="activo">
                                    Activa
                                </option>
                                <option value="inactivo">
                                    Inactiva
                                </option>
                            </select>
                        </>
                    }

                    {message.msg &&
                        <div className="w-100 flex-center">
                            <p className={`message ${message.type}`}>
                                {message.msg}
                            </p>
                        </div>
                    }

                    <div className="w-100 flex-right">
                        <button type="submit" className="btn btn-blue">Guardar</button>
                        <button type="button" className="btn btn-gray" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}