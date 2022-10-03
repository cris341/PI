
import imagen from "../img/404.webp"
export default function Error_route(){
    return(
        <div className="error_404">
        <h1>Page not found 404</h1>
        <img src={imagen} width={500} alt="ERROR 404"></img>
        </div>
    )
}