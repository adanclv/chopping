import React from 'react';

export default function Membresia(
    cuentaCliente = "12345",
    claveMembresía = "GOLD2023",
    fechaActivacion = "2023-01-01",
    fechaVencimiento = "2023-12-31"
) {
    const estaActiva = new Date(fechaVencimiento) > new Date()
    return (
        <div className="membresia-card">
            <div className="membresia-header">
                <h2 className="membresia-title">
                    Membresía
                    <span className={`membresia-badge ${estaActiva ? "membresia-badge-activa" : "membresia-badge-vencida"}`}>
                        {estaActiva ? "Activa" : "Vencida"}
                    </span>
                </h2>
            </div>
            <div className="membresia-content">
                <dl className="membresia-info-grid">
                    <div className="membresia-info-item">
                        <dt className="membresia-info-label">Cuenta del cliente</dt>
                        <dd className="membresia-info-value">cuentaCliente</dd>
                    </div>
                    <div className="membresia-info-item">
                        <dt className="membresia-info-label">Clave de membresía</dt>
                        <dd className="membresia-info-value">claveMembresía</dd>
                    </div>
                    <div className="membresia-info-item">
                        <dt className="membresia-info-label">Fecha de activación</dt>
                        <dd className="membresia-info-value">{new Date(fechaActivacion).toLocaleDateString()}</dd>
                    </div>
                    <div className="membresia-info-item">
                        <dt className="membresia-info-label">Fecha de vencimiento</dt>
                        <dd className="membresia-info-value">{new Date(fechaVencimiento).toLocaleDateString()}</dd>
                    </div>
                </dl>
            </div>
        </div>

    );
}
