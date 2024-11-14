import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Error 404 - Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        Volver a la página principal
      </Link>
    </div>
  );
};

export default NotFound;
