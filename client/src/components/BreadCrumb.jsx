import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  
  // Separamos la ruta actual en segmentos
  const pathSegments = location.pathname.split('/').filter(Boolean);
  console.log(pathSegments);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Inicio</Link>
        </li>
        {pathSegments.map((segment, index) => {
          const to = '/' + pathSegments.slice(1, index + 1).join('/');
          return (
            <li key={index} className="breadcrumb-item">
              <Link to={to}>{segment}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
