import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ breadcrumbs = [] }) {
    return (
        <div className="breadcrumbs">
            <ul>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index}>
                        <Link to={breadcrumb.href} className={breadcrumb.active ? 'text-black' : 'text-gray'}>{breadcrumb.label}</Link>
                        {index < breadcrumbs.length - 1 && <span className="separator">/</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

Breadcrumbs.propTypes = {
    breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        active: PropTypes.bool
    })).isRequired
};