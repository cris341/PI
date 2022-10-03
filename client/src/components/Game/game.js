import React from "react";
import { Link } from "react-router-dom";
import "./game.css";
import imagen from "../img/estrella.png"
import imagen2 from "../img/error.webp"
export default function Game({img, name, generos,id, boolean, rating}){

    //remplaza la imagen por otra si algun tipo de error
    function reemplaza_imagen(e) {
        console.log(e.target)
        e.target.onerror = "";
        e.target.src = imagen2;
        return true;
    }
    //divide los generos para mostralos
    let StringGenero = generos.join(" - ");
    return(
        <React.Fragment>
                <div className="card">
                    <figure>
                        {boolean?<div className="guardado">Juego Guardado</div>:<div className="Noguardado">Juego no guardado</div>}
                        <img src={img} alt="Imagen dañada"onError={reemplaza_imagen}/> 
                        
                    </figure>
                    <div className="contenido"> 
                        <h3> {name}</h3><div>Rating: <img src={imagen} alt="estrella"/> <label>{rating}</label></div>
                         <p>{StringGenero}</p>
                         <div className="button">
                         <Link to={{pathname:`/detalles/${id}`,dato:boolean}}>Detalles</Link>
                         
                         </div>
                    </div>
                </div>
        </React.Fragment>
    )
}