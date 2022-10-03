import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
export default function NavBar(){
    return(
        <React.Fragment>¿
            <div className="Navbar">
                <ul>
                    <li><Link to={"/home"}>Inicio</Link></li>
                    <li><Link to={"/Games"}>Mis juegos</Link></li>
                    <li><a href="#contact">Carrito</a></li>
                    <li><Link to={"/Crear_juego"}>Añadir juego</Link></li>
                    <li><a href="#about">Información</a></li>
                </ul>
            </div>
        </React.Fragment>
    )
}