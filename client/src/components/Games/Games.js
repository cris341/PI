import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filtroGames, getGamesSave, GetVideojuegos } from "../../redux/action";
import Game from "../Game/game";
import banner from "../img/banner_home.png"
import img_carga from "../img/carga2.gif"
import "./Games.css";
export  default function Games(){
    let dispatch = useDispatch();
    let consulta = useSelector ((state) => state.consulta)
    let Generos = useSelector(state => state.Generos)
    //trae los juegos filtrados
    let allgames = useSelector ((state) => state.BuscadorGame )
    //realiza la paginacion referente al total de juegos
    let paginas =[];
    for (let i = 1; i < allgames.length/15 +1; i++) {paginas.push(i)}
    const [paginit, setpaginit] = useState(0)
    const [pagfinal, setpagfinal] = useState(15)
    //pagina no lo que se muestra
    const currentGame = allgames.slice(paginit, pagfinal)
    //buscador
    const Buscador = (e)=>{
        setpaginit(0)
        setpagfinal(15)
        dispatch(filtroGames(e.target.value,e.target.name))
    }
    //cambia de pagina
    const PasarPagina = (e,p)=>{
        if(p ==="previous"){
            if(paginit !== 0){
                setpaginit(paginit-15)
                setpagfinal(pagfinal -15)
            }
        }else if(p ==="next"){
            if(allgames.length > pagfinal){
                setpaginit(paginit+15)
                setpagfinal(pagfinal +15)
            }
        }
        else{
            setpaginit(p*15-15)
            setpagfinal(p * 15)
        }
        // setgamespag(game1.slice(p*15-15, p * 15))
    }
    useEffect(()=>{
        //verifica que no se haya echo ya la consulta
        if(consulta){
            dispatch(GetVideojuegos())  
        }
        dispatch(getGamesSave())   
    },[dispatch,consulta])

    return(
        <React.Fragment>
            <div className="body">
                <div className="juego_button">
                    <Link to={"/Crear_juego"}>Añadir juego</Link>
                </div>
                <div className="banner">
                    <img src={banner} alt="banner"/>

                </div>
                <div className="ordenado">
                    <label>Buscar juego: </label>
                    <input onChange={Buscador} type="text" placeholder="Buscador" name={"Buscador"} />
                    <select onChange={(e) => Buscador(e)} name="categoria">
                        <option value={""}>Categorias</option>
                        {Generos && Generos.map(g =>(
                            <option key={g}>{g}</option>    
                        ))}
                    </select>
                    <select onChange={(e) => Buscador(e)} name="Ordenar_alfabetico">
                        <option value={""}>Ordenar</option>
                        <option value={"A-Z"}>A - Z</option>
                        <option value={"Z-A"}>Z - A</option>
                    </select>
                    <select onChange={(e) => Buscador(e)} name="Ordenar_Rating">
                        <option value={""}>Rating</option>
                        <option value={"mayor"}>Mayor a Menor</option>
                        <option value={"menor"}>Menor a Mayor</option>
                    </select>
                    <ul>
                        <li onClick={(e)=>PasarPagina(e,"previous")}>{"<previous" }</li>
                    {paginas.map(p => (<li key={p} onClick={(e)=>PasarPagina(e,p)}>| {p} |</li>))}
                        <li onClick={(e)=>PasarPagina(e,"next")}>{"next>" }</li>
                    </ul>
                </div>
                {currentGame.length === 0? <><h1>NO HAY JUEGOS</h1><img src={img_carga} alt="imagen de carga"/> </>:
                <div className="container">
                    {
                    currentGame && currentGame.map((game)=>
                    
                        <Game  key={game.id} 
                        rating={game.Rating} 
                        id={game.id}
                        img={game.image} 
                        name={game.Nombre} 
                        generos ={game.generos?game.generos.map(g => g.name):game.Generos.map(g => g.Nombre)} 
                        boolean={game.generos?false:true}/>
                    )
                    }
                </div>
                }
            </div>
        </React.Fragment>
    )
}