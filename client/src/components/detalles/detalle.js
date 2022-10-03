import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { CrearJuego, GetDetalleGame, GetDetalleGameSave, limpiarDetalle } from "../../redux/action";
import "./detalle.css";
import Image from"../img/loading-cargando.gif"
import imagen2 from "../img/error.webp"
export default function Detalle(props){
    let [pagina, setpagina]= useState(true)

    let {id} = useParams(); 
    let {dato} =useLocation();

    let juego = useSelector ((state) =>state.DetalleGame);
    let respuesta = useSelector(state => pagina? "":state.respuesta)

    let dispatch = useDispatch();
    //guarda el juego
    function GuardarJuego(){
        setpagina(false)
        let inputs ={id:juego.id,
            name:juego.name,
            fecha:juego.fecha,
            Rating:juego.rating,
            image:juego.image,
            Generos:juego.generos.map(g => g.name),
            Plataformas:juego.plataformas.map(g => g.platform.name),
            Descripcion:juego.description}
        dispatch(CrearJuego(inputs,))
    }
    function reemplaza_imagen(e) {
        console.log(e.target)
        e.target.onerror = "";
        e.target.src = imagen2;
        return true;
    }
    useEffect(()=>{
        if(dato){
            dispatch(GetDetalleGameSave(id))
        }else{
            dispatch(GetDetalleGame(id))
        }
        return ()=>{
             dispatch(limpiarDetalle())
        }
        // setjuego(getjuego)
    },[dispatch,id,dato])
    return(
        <React.Fragment>
            <div className="body">
                <div className="button_home">
                    <Link to={"/home"}>{"<= VOLVER"}</Link>
                </div>
                {!juego.name? <img src={Image} alt="imagen de carga"/>:
                <div className="Cards">
                    <h1>{juego.name}</h1> 
                    <div className="detalle">
                        <div className="detalle_img">
                        <img src={juego.image} alt="Imagen dañada"onError={reemplaza_imagen}/>
                        </div>
                        <div className="detalle_texto">
                            <p>{juego.description}</p>
                            <p><strong>Fecha de lanzamiento: </strong>{juego.fecha}</p>
                            <p><strong>Rating: </strong>{juego.rating}</p>
                            <p><strong>Generos: </strong>{juego.generos.map(g => g.name?`${g.name} - `:`${g.Nombre} - `)}</p>
                            <p><strong>Plataformas: </strong>{juego.plataformas.map(g => g.platform?`${g.platform.name} - `:`${g} - `)}</p>
                            {dato? true:
                                <div><button onClick={(e)=>GuardarJuego()} className="Button_guerdar">Guardar Juego</button></div> 
                            }
                            {respuesta && <p className="ERROR">{respuesta}</p>}

                        </div>
                    </div>
                </div>
                }
            </div>
        </React.Fragment>
    )
}