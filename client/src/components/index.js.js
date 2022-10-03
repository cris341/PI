import { Link } from "react-router-dom"
import image from "../img/control.png"
import image2 from "../img/pacman.gif"
export default function Inicio(){
    return(
        <>
        <div className="inicio">
            <h1><img src={image} alt="fondo inicio"/>VIDEO GAMES </h1>
        </div>
        <div className="button_inicio">
            <Link to={"/home"}>START</Link>
        </div>
        <div>
            <img src={image2} alt="gif_inicio" width={450}/>
        </div>
        </>
        
    )
}