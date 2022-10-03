import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CrearJuego } from "../../redux/action";
import "./AñadirGame.css"
export default function AñadirJuego(){
    let [pagina, setpagina]= useState(true)
    //trae los generos y platafomras
    let Generos = useSelector(state => state.Generos)
    let plataformas = useSelector(state => state.Plataformas)
    let respuesta = useSelector(state => pagina? "":state.respuesta)

    let [inputs, setinputs] = useState(
        {
        name:"",
        image:"",
        fecha:"",
        Rating:"",
        Generos:[],
        Plataformas:[],
        Descripcion:""
    });
    let [plataformasCheck, setplaformas] =useState([]);
    let [GenerosInputs, setGenerosInputs] =useState([]);
    let [RespuestError,setRespuestError] =useState("")
    let dispatch = useDispatch();

    //coloca los generos y plataformas seleccionadas en los inputs
    useEffect(()=>{
        setinputs((prev) =>({...prev,Plataformas: plataformasCheck}))
        setinputs((prev) =>({...prev,Generos: GenerosInputs}))
    },[plataformasCheck,GenerosInputs])

    //valida que seleccione almenos una plataforma y un genero
    function handleSubmit(e){
        e.preventDefault();

        if(inputs.name === ""){
            setRespuestError("El name no puede estar vacio")
        }else{
            setpagina(true)
            // if(inputs.Generos.length === 0){
            //     setRespuestError("Debe seleccionar almenos un Genero");
            // }
            // else if(inputs.Plataformas.length === 0){
            //     setRespuestError("Debe seleccionar almenos una Plataforma");
            // }else{   
                dispatch(CrearJuego(inputs))
                setpagina(false)
                setRespuestError("");
            // }
        }


    }
    //almacena los inputs
    function handleChange(e){
        setinputs( (prev) =>({ ...prev, [e.target.name]: e.target.value}))
    }
    //actualiza los estados de generos y plataformas
    function CheckInput(e){
        let nombre = e.target.name;
        let checked = e.target.checked
        if(nombre === "Generos"){
            if (checked === true) {
                setGenerosInputs(GenerosInputs.concat(e.target.value))
            }else{
                setGenerosInputs(GenerosInputs.filter(g => g !== e.target.value))
            }
        }else if(nombre === "Plataformas"){
            if (checked === true) {
                setplaformas(plataformasCheck.concat(e.target.value))
            }else{
                setplaformas(plataformasCheck.filter(g => g !== e.target.value))
            }
        } 
    }

    return(
        <React.Fragment>
            <div className="body">
                <div className="button_home">
                    <Link to={"/home"}>{"<= VOLVER"}</Link>
                </div>
                <div className="forms">
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <h2>CREAR JUEGO</h2>
                        <div className="input">
                            <label> Nombre del juego</label>
                            <input onChange={handleChange} name="name" type="text"/>
                            <label> Imagen (URL)</label>
                            <input onChange={handleChange} name="image" type="text"/>
                        </div>
                        <div className="input">
                            <label>Fecha de lanzamiento</label>
                            <input onChange={handleChange} name="fecha" type="date" required/>
                            <label>Rating</label>
                            <input onChange={handleChange} name="Rating" type="number"required max={5} min={1} />
                        </div>
                        <strong>Generos</strong>
                        <div className="input_chek">
                            {
                                Generos.map(p => <div key={p}><label>{p}</label> <input name="Generos" onChange={(e)=>CheckInput(e)} type={"checkbox"} value={p}/>  </div> )
                            }
                        </div>
                        <strong>Plataformas</strong>
                        <div className="input_chek">
                            {
                                plataformas.map(p => <div ><label>{p}</label> <input name ="Plataformas" onChange={(e)=>CheckInput(e)}type={"checkbox"} value={p}/>  </div>) 
                            }
                        </div>
                        <div className="input">
                            <label>Descripción del juego</label>
                            <textarea onChange={handleChange} name="Descripcion" placeholder="Descripcion del juego"/>
                        </div>
                            {respuesta && <p className="ERROR">{respuesta}</p>}
                            {RespuestError && <p className="ERROR">{RespuestError}</p>}
                        <button className="Button_guerdar"> Guardar </button>
                    </form>
                </div>
            </div>
            
        </React.Fragment>
    )
}