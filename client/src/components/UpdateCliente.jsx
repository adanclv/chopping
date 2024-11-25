import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateCliente({ cliente, propiedad }) {
    const renderContent = () => {
        switch (propiedad) {
            case 'nombre':
                return <SettingNombre cliente={cliente} />;
            case 'correo':
                return <SettingCorreo cliente={cliente} />;
            case 'telefono':
                return <SettingTelefono cliente={cliente} />;
            case 'password':
                return <SettingPassword cliente={cliente} />;
            case 'domicilio':
                return <SettingDomicilio cliente={cliente} />;
            default:
                return <SettingNombre />;
        }
    };
    return (
        <>
            {renderContent()}
        </>
    );
}

function SettingNombre({ cliente }) {
    const [nombre, setNombre] = useState(cliente.NombCliente);
    const [paterno, setPaterno] = useState(cliente.ApePatCliente);
    const [materno, setMaterno] = useState(cliente.ApeMatCliente);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:5000/api/updateCliente`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: cliente.NoCliente,
                    nombre,
                    paterno,
                    materno,
                })
            });

            if (response.ok) {
                // const data = await response.json();
                navigate(`/cuenta/${cliente.NoCliente}/administrar-cuenta?success=success_change_name`);
            } else {
                // const errorData = await response.json();
                navigate(`/cuenta/${cliente.NoCliente}/administrar-cuenta?failed=true`);
            }
        } catch (error) {
            console.error('Error al enviar datos de actualización:', error);
        }
    };
    return (
        <div className="update-propiedad">
            <h1>Cambiar nombre</h1>
            <div className="seguridad-settings">
                <p>Si quieres cambiar el nombre asociado a tu cuenta de cliente, puedes hacerlo a continuación. Asegúrate de hacer clic en el botón Guardar cambios cuando hayas terminado.</p>
                <form onSubmit={handleSubmit} className="update-form">
                    <label htmlFor="nombre">Nuevo nombre</label>
                    <input id="nombre" 
                        name="nombre" 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                    required />

                    <label htmlFor="paterno">Nuevo apellido paterno</label>
                    <input id="paterno" 
                        name="paterno" 
                        type="text" 
                        value={paterno} 
                        onChange={(e) => setPaterno(e.target.value)}    
                    required />

                    <label htmlFor="materno">Nuevo apellido materno</label>
                    <input id="materno" 
                        name="materno" 
                        type="text" 
                        value={materno} 
                        onChange={(e) => setMaterno(e.target.value)}
                    required />

                    <button type="submit">Guardar cambios</button>
                </form>
            </div>
        </div>
    );
}

function SettingCorreo({ cliente }) {
    const [correo, setCorreo] = useState(cliente.MailCliente);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/updateCliente`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: cliente.NoCliente,
                    correo,
                })
            });

            if (response.ok) {
                // const data = await response.json();
                navigate(`/cuenta/${cliente.NoCliente}/administrar-cuenta?success=success_change_email`);
            } else {
                // const errorData = await response.json();
                navigate(`/cuenta/${cliente.NoCliente}/administrar-cuenta?failed=true`);
            }
        } catch (error) {
            console.error('Error al enviar datos de actualización:', error);
        }
    };

    return (
        <div className="update-propiedad">
            <h1>Cambiar correo</h1>
            <div className="seguridad-settings">
                <p>
                    Dirección de correo electrónico actual: {cliente.MailCliente}
                </p>
                <p>Escribe a continuación la nueva dirección de correo electrónico con la que deseas asociar tu cuenta. Asegúrate de hacer clic en el botón Guardar cambios cuando hayas terminado.</p>
                <form onSubmit={handleSubmit} className="update-form">
                    <label htmlFor="correo">Nuevo correo electrónico</label>
                    <input id="correo" name="correo" type="email" onChange={(e) => setCorreo(e.target.value)} required />

                    <button type="submit">Guardar cambios</button>
                </form>
            </div>
        </div>
    );
}

function SettingTelefono({ cliente }) {
    const [telefono, setTelefono] = useState(cliente.TelCliente);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/updateCliente`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: cliente.NoCliente,
                    telefono,
                })
            });

            if (response.ok) {
                // const data = await response.json();
                navigate(`/cuenta/${cliente.NoCliente}/administrar-cuenta?success=success_change_phone`);
            } else {
                // const errorData = await response.json();
                navigate(`/cuenta/${cliente.NoCliente}/administrar-cuenta?failed=true`);
                // console.log(errorData);
            }
        } catch (error) {
            console.error('Error al enviar datos de actualización:', error);
        }
    };

    return (
        <div className="update-propiedad">
            <h1>Cambiar número de celular</h1>
            <div className="seguridad-settings">
                <p>
                    Número de celular actual: {cliente.TelCliente}
                </p>
                <form onSubmit={handleSubmit} className="update-form">
                    <label htmlFor="telefono">Nuevo número de celular</label>
                    <input id="telefono" name="telefono" type="tel"
                     onChange={(e) => setTelefono(e.target.value)}
                     required />

                    <button type="submit">Guardar cambios</button>
                </form>
            </div>
        </div>
    );
}

function SettingPassword({ cliente }) {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [continueSubmit, setContinueSubmit] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!continueSubmit) {
            setMsg('Las contraseñas no coinciden AAA');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/changePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    id: cliente.NoCliente,
                    password: oldPassword,
                    newPassword: password,
                })
            });

            if (response.ok) {
                // const data = await response.json();
                navigate(`/cuenta/${cliente.NoCliente}/administrar-cuenta?success=success_change_password`);
            } else if (response.status === 401) {
                const errorData = await response.json();
                setMsg(errorData.message);
            } else {
                navigate(`/cuenta/${cliente.NoCliente}/administrar-cuenta?failed=true`);
            }
        } catch (error) {
            console.error('Error al enviar datos de actualización:', error);
        }
    };

    const validatePassword = (e) => {
        if (e.target.value !== password) {
            setMsg('Las contraseñas no coinciden');
            setContinueSubmit(false);
        } else {
            setMsg('');
            setContinueSubmit(true);
        }
    };

    return (
        <div className="update-propiedad">
            <h1>Cambiar contraseña</h1>
            <div className="seguridad-settings">
                <p>
                    Utiliza el siguiente formulario para cambiar la contraseña de tu cuenta.
                </p>
                <form onSubmit={handleSubmit} className="update-form">
                    <label htmlFor="oldPassword">Contraseña actual</label>
                    <input id="oldPassword" name="oldPassword" type="password" onChange={(e) => setOldPassword(e.target.value)} required />

                    <label htmlFor="password">Nueva contraseña</label>
                    <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} required />

                    <label htmlFor="confirm-password">Confirmar contraseña</label>
                    <input id="confirm-password" name="confirm-password" className="" type="password" onChange={validatePassword} required />

                    {msg && <div className='error-msg'>
                        <p>{msg}</p>
                    </div> }

                    <button type="submit">Guardar cambios</button>
                </form>
            </div>
        </div>
    );
}

function SettingDomicilio({ cliente }) {
    const [domicilio, setDomicilio] = useState(cliente.DomCliente);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/updateCliente`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: cliente.NoCliente,
                    domicilio,
                })
            });

            if (response.ok) {
                // const data = await response.json();
                navigate(`/cuenta/${cliente.NoCliente}/administrar-cuenta?success=success_change_address`);
            } else {
                // const errorData = await response.json();
                navigate(`/cuenta/${cliente.NoCliente}/administrar-cuenta?failed=true`);
            }
        } catch (error) {
            console.error('Error al enviar datos de actualización:', error);
        }
    };

    return(
        <div className="update-propiedad">
            <h1>Cambiar domicilio</h1>
            <div className="seguridad-settings">
                <p>
                    Domicilio actual: {cliente.DomCliente}
                </p>
                <form onSubmit={handleSubmit} className="update-form">
                    <label htmlFor="domicilio">Nuevo domicilio</label>
                    <input id="domicilio" name="domicilio" type="text" 
                    onChange={(e) => setDomicilio(e.target.value)}
                    required />

                    <button type="submit">Guardar cambios</button>
                </form>
            </div>
        </div>
    );
}