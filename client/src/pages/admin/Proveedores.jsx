import { Link } from 'react-router-dom';
import TablaProveedor from '../../components/Tabla-Proveedor';

export default function Proveedores() {
    return (
        <>
            <div className='flex-justify-space-between'>
                <h1>Proveedores</h1>
                <Link className='flex-container-center btn-create'>
                    Crear Proveedor
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor" />
                    </svg>
                </Link>


            </div>
            <div className='flex-left'>
                <input type="text" placeholder='Buscar' />
            </div>

            <TablaProveedor />

        </>
    );
}