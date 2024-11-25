import React from "react";
import TablaMisCompras from "../components/TablaMisCompras";
import Breadcrumb from "../components/BreadCrumb";
import { useParams } from "react-router-dom";

export default function Compras() {
    const { id } = useParams();
    return (
        <>
            <Breadcrumb name={["Cuenta", "Mis Compras"]} paths={[`/cuenta/${id}`, `/cuenta/${id}/miscompras`]}/>
            <h1>Mis Compras</h1>
            <TablaMisCompras />
        </>
    );
}