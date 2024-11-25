import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ name, paths }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {paths.map((path, index) => {
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
