import React, { useState, useEffect } from 'react';
import { useParams, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import UpdateCliente from '../components/UpdateCliente';
import NotFound from './NotFound';
import Breadcrumb from '../components/BreadCrumb';

export default function ManageCuenta() {
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {

    const fetchCliente = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getCliente?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCliente(data.cliente);
        } else {
          const errorData = await response.json();
          console.error(`Error al obtener cliente: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error al obtener cliente:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [id, location]);

  return (
    <>
      
      {loading && <p>Cargando...</p>}

      {error && <p>{error}</p>}

      {cliente &&
        <>
        <Breadcrumb name={["Cuenta", "Mi Cuenta"]} paths={[`/cuenta/${id}`, `/cuenta/${id}/administrar-cuenta`]} />
          <Routes>
            <Route path="/" element={<SettingItems cliente={cliente} id={id} />} />
            <Route path="cambiar-nombre" element={<UpdateCliente cliente={cliente} propiedad="nombre" />} />
            <Route path="cambiar-correo" element={<UpdateCliente cliente={cliente} propiedad="correo" />} />
            <Route path="cambiar-telefono" element={<UpdateCliente cliente={cliente} propiedad="telefono" />} />
            <Route path="cambiar-pass" element={<UpdateCliente cliente={cliente} propiedad="password" />} />
            <Route path="cambiar-domicilio" element={<UpdateCliente cliente={cliente} propiedad="domicilio" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      }
    </>
  );
}

function SettingItems({ cliente, id }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get('success');
  const failed = queryParams.get('failed') === 'true';

  const propUpdated = () => {
    switch (success) {
      case 'success_change_name':
        return 'Se actualizó el nombre';
      case 'success_change_email':
        return 'Se actualizó el correo electrónico';
      case 'success_change_phone':
        return 'Se actualizó el número de teléfono';
      case 'success_change_password':
        return 'Se actualizó la contraseña';
      case 'success_change_address':
        return 'Se actualizó el domicilio';
      case 'fail_change':
      default:
        return '';
    }
  };

  return (
    <div className="seguridad">
      {success && <div className='success-change'>
        <p>✅ {propUpdated()}</p>
      </div>}

      {failed && <div className='failed-change'>
        <p>Error al actualizar</p>
      </div>}
      <h1>Inicio de sesión y seguridad</h1>
      <div className='seguridad-settings'>
        <SettingItem
          title="Nombre"
          description={`${cliente.NombCliente} ${cliente.ApePatCliente} ${cliente.ApeMatCliente}`}
          buttonLabel="Editar"
          id={id}
        />

        <SettingItem
          title="Correo electrónico"
          description={cliente.MailCliente}
          buttonLabel="Editar"
          id={id}
        />

        <SettingItem
          title="Número de celular"
          description={cliente.TelCliente}
          buttonLabel="Editar"
          id={id}
        />

        <SettingItem
          title="Contraseña"
          description="**********"
          buttonLabel="Editar"
          id={id}
        />

        <SettingItem
          title="Domicilio"
          description={cliente.DomCliente}
          buttonLabel="Editar"
          id={id}
        />
      </div>
    </div>
  );
}

function SettingItem({ title, description, buttonLabel, id }) {
  const navigate = useNavigate();
  const path = () => {
    switch (title) {
      case 'Nombre':
        return 'cambiar-nombre';
      case 'Correo electrónico':
        return 'cambiar-correo';
      case 'Número de celular':
        return 'cambiar-telefono';
      case 'Contraseña':
        return 'cambiar-pass';
      case 'Domicilio':
        return 'cambiar-domicilio';
      default:
        return '/';
    }
  }

  const handleClick = () => {
    navigate(`/cuenta/${id}/administrar-cuenta/${path()}`);
  };

  return (
    <div className="setting-item">
      <div className="setting-info">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button className="edit-button" onClick={handleClick}>{buttonLabel}</button>
    </div>
  );
}  