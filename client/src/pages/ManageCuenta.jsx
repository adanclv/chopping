import React from 'react';
// import './SecuritySettings.css';

function ManageCuenta() {
  return (
    <div className="seguridad">
      <h1>Inicio de sesión y seguridad</h1>
      <div className="seguridad-settings">
        <SettingItem
          title="Nombre"
          description="Adan Clemente Villegas"
          buttonLabel="Editar"
        />

        <SettingItem
          title="Correo electrónico"
          description="adanclv11@hotmail.com"
          buttonLabel="Editar"
        />

        <SettingItem
          title="Número de celular"
          description="833-444-13-72"
          buttonLabel="Editar"
        />

        <SettingItem
          title="Contraseña"
          description="**********"
          buttonLabel="Editar"
        />
      </div>
    </div>
  );
}

function SettingItem({ title, description, buttonLabel, showWarning }) {
  return (
    <div className="setting-item">
      <div className="setting-info">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button className="edit-button">{buttonLabel}</button>
    </div>
  );
}

export default ManageCuenta;  