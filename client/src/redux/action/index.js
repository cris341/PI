const axios = require('axios');
const KEY = "7ef41484b15e4405be3b1863c1374a5a&page";

//OBTENER DE AL API 120 JUEGOS
export let GetVideojuegos = (pag)=>{
    return (dispatch) =>{
        for (let i = 1; i < 4; i++) {
            let juego = [];
            fetch(`https://api.rawg.io/api/games?key=${KEY}=${i}&page_size=40`)
            .then(response => response.json())
            .then(data =>{ 
                data.results.map((e)=>{
                    return juego.push({
                        id: e.id, 
                        Nombre: e.name, 
                        image: e.background_image, 
                        generos: e.genres,
                        plataformas: e.parent_platforms,
                        Rating: e.rating
                    })                    
                })
                dispatch({type: "GET_JUEGOS",payload:juego})
            })  
        }
    }
}
//Traer detalle del juego por el id
export let GetDetalleGame = (id) =>{
    return(dispatch)=>{
        fetch(`https://api.rawg.io/api/games/${id}?key=${KEY}`)
        .then(response => response.json())
        .then(data=>{
            dispatch({
                type: "GET_JUEGOS_DETALLES",
                payload:{
                    id: data.id,
                    name:data.name,
                    description:data.description_raw,
                    image: data.background_image,
                    fecha:data.released,
                    generos: data.genres,
                    rating:data.rating,
                    plataformas:data.parent_platforms
                }})
        })
    }
}
//traer detalle de la base de datos por el id
export let GetDetalleGameSave = (id) =>{
    return(dispatch)=>{
        axios.get(`http://localhost:3001/videogames/${id}`)
        .then(function (response) {
            dispatch({type: "GET_JUEGOS_GAME_DETALLES",payload:{
                id: response.data.id,
                name:response.data.Nombre,
                description: response.data.Descripcion,
                image: response.data.image,
                fecha:response.data.Fecha_de_lanzamiento,
                generos: response.data.Generos,
                rating:response.data.Rating,
                plataformas:response.data.Plataformas
            }})
          })
    }
}
//crear juego en la base de datos
export let CrearJuego = (inputs) =>{
    return(dispatch)=>{
        axios.post('http://localhost:3001/VideoJuego', {
            data: inputs
          }).then(function (response) {
            dispatch({type: "CREATE_GAME",payload:response.data,id: inputs.id})
          })
    }
}
//traer todos los juegos de la base de datos
export let getGamesSave = () =>{
    return(dispatch)=>{
        axios.get('http://localhost:3001/videogames')
        .then(function (response) {
            dispatch({type: "GAME_SAVE",payload:response.data})
          })
    }
}
//filtrar juegos 
export let filtroGames=(value,name)=>{
    return(dispatch)=>{
        dispatch({type: "FILTRO_GAMES",payload:{value,name}})
    } 
}
//limpiar respuesta del juego
export let limpiarDetalle = ()=>{
    return(dispatch)=>{
        dispatch({type: "LIMPIAR_DETALLE",})
    } 
}
