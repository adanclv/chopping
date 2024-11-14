import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ name, paths }) => {
  const location = useLocation();  
  // Separamos la ruta actual en segmentos
  // const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {/* <li className="breadcrumb-item">
          <Link to="/">Inicio</Link>
        </li> */}
        {paths.map((path, index) => {
          //const to = '/' + pathSegments.slice(0, index + 2).join('/');
          const to = path;
          return (
            <li key={index} className="breadcrumb-item">
              <Link to={to}>{name[index]}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
