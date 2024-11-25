import React, { useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { useNavigate, useParams } from "react-router-dom";

export default function FormProveedores() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        email: '',
        domicilio: '',
        rfc: '',
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
                    const response = await fetch(`http://localhost:5000/api/proveedores/${id}`);
                    const data = await response.json();
                    if (response.ok) {
                        setFormData({
                            nombre: data.NombProveedor,
                            telefono: data.TelProveedor,
                            email: data.MailProveedor,
                            domicilio: data.DomProveedor,
                            rfc: data.RFCProveedor,
                            estado: data.Estado
                        });
                    } else {
                        setMessage({ msg: data.msg, type: 'error' });
                    }
                } catch (error) {
                    setMessage({ msg: 'Error al cargar los datos del proveedor', type: 'error' });
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

        if (!formData.nombre || !formData.telefono || !formData.email || !formData.domicilio || !formData.rfc || !formData.estado) {
            setMessage({ msg: "Todos los campos son obligatorios.", type: "error" });
            return;
        }

        try {
            const response = await fetch(id ? `http://localhost:5000/api/proveedores/update/${id}`
                : 'http://localhost:5000/api/proveedores/create', {
                method: id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({
                    msg: id ? 'Proveedor actualizado con éxito'
                        : 'Proveedor creado con éxito', type: 'success'
                });
                setTimeout(() => {
                    clearData();
                    navigate('/admin/proveedores');
                }, 2000);
            } else {
                setMessage({ msg: data.msg, type: 'error' });
            }
        }
        catch (error) {
            setMessage({ msg: 'Error al crear proveedor', type: 'error' });
        }
    }

    const clearData = () => {
        setFormData({
            nombre: '',
            telefono: '',
            email: '',
            domicilio: '',
            rfc: '',
            estado: ''
        });

        setMessage({
            msg: '',
            type: ''
        });
    }

    const handleCancel = () => {
        clearData();
        navigate('/admin/proveedores');
    }

    return (
        <div className="main-content">
            <Breadcrumbs breadcrumbs={[
                { label: 'Proveedores', href: '/admin/proveedores' },
                { label: id ? 'Editar Proveedor' :'Crear Proveedor', href: '/admin/proveedores/create', active: true }
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
                    <label htmlFor="email">Correo Electronico:</label>
                    <input
                        type="email"
                        value={formData.email}
                        name="email"
                        placeholder="Correo Electronico"
                        id="email"
                        onChange={handleChange} />
                    <label htmlFor="telefono">Telefono:</label>
                    <input
                        type="tel"
                        value={formData.telefono}
                        name="telefono"
                        placeholder="Telefono"
                        id="telefono"
                        onChange={handleChange} />
                    <label htmlFor="domicilio">Domicilio:</label>
                    <input
                        type="text"
                        value={formData.domicilio}
                        name="domicilio"
                        placeholder="Domicilio"
                        id="domicilio"
                        onChange={handleChange} />
                    <label htmlFor="rfc">RFC:</label>
                    <input
                        type="text"
                        value={formData.rfc}
                        name="rfc"
                        placeholder="RFC"
                        id="rfc"
                        onChange={handleChange} />

                    {id &&
                        <>
                            <label htmlFor="estado">Estado:</label>
                            <select name="estado" id="estado" value={formData.estado} onChange={handleChange}>
                                <option value="activo">
                                    Activo
                                </option>
                                <option value="inactivo">
                                    Inactivo
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