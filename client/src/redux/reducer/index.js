// let idUser =1;

const initialState ={
    Games:[],
    BuscadorGame:[],
    consulta: true,
    DetalleGame:{},
    Generos :[],
    Plataformas:[],
    respuesta:[],
}

export default function rootReducer(state=initialState, action){
    switch (action.type) {
        case "GET_JUEGOS":
            let generos =[];
            let plataformas =[];
            let juegos = [...state.Games, ...action.payload]
            let hash1 = {};
            //verificar que no hayan juegos repetidos
            let array2 = juegos.filter((g) =>{
                let exists = !hash1[g.Nombre];
                hash1[g.Nombre] = true;
                return exists;
                });
            //separar los generos y platafomas existentes
            action.payload.map(e=> e.generos.map(n => generos.includes(n.name)? false: generos.push(n.name)));
            action.payload.map(g => g.plataformas.map(p =>plataformas.includes(p.platform.name)?false:plataformas.push(p.platform.name)))    
            return {
                ...state,
                Games: [...array2],
                BuscadorGame: [...array2],
                Generos:[ ...generos],
                Plataformas:[...plataformas],
                consulta: false
            }
        case "GET_JUEGOS_DETALLES":
            return {
                ...state,
                DetalleGame: {...action.payload}
            }
        case "CREATE_GAME":
            let game = state.Games.filter(g => g.id !== action.id )
            return {
                ...state,
                respuesta: [action.payload],
                Games: [...game],
                }
        case "GAME_SAVE":  
                let games1 = [...state.Games, ...action.payload]
                let hash = {};
                //sacar los repetidos
                let array = games1.filter((g) =>{
                    let exists = !hash[g.id];
                    hash[g.id] = true;
                    return exists;
                    });
            return {
                ...state,
                BuscadorGame:[...array],
                Games: [...array],
                }
        case "GET_JUEGOS_GAME_DETALLES":
                //se almacena respuesta del servidor
                return {
                ...state,
                DetalleGame: {...action.payload}
                }      
        case "LIMPIAR_DETALLE":
            return {
                ...state,
                DetalleGame: {}
                }
        case "FILTRO_GAMES":
                let array1 = [];
                if(action.payload.name === "Buscador"){
                    array1 =action.payload.value ?
                    state.Games.filter(g =>g.Nombre.toLowerCase().includes(action.payload.value.toLowerCase())):state.Games;

                }else if(action.payload.name === "categoria"){
                    array1 =action.payload.value?state.Games.filter(game=>
                        game.generos?game.generos.map(g => g.name).includes(action.payload.value)
                        :game.Generos.map(g => g.Nombre).includes(action.payload.value)
                        ):state.Games

                }else if(action.payload.name ==="Ordenar_Rating"){
                    array1 = action.payload.value === "menor"? 
                    state.Games.sort((a,b) => a.Rating-b.Rating)
                    :state.Games.sort((a,b) => b.Rating-a.Rating)

                }else if(action.payload.name ==="Ordenar_alfabetico"){
                    array1 = action.payload.value === "A-Z"? 
                    state.Games.sort((a,b) => {
                        if (b.Nombre>a.Nombre) {return -1;}
                        if (b.Nombre<a.Nombre) {return 1;}
                        return 0;
                    })
                    :state.Games.sort((a,b) =>  {
                        if (b.Nombre<a.Nombre) {return -1;}
                        if (b.Nombre>a.Nombre) {return 1;}
                        return 0;
                    })
                }
            return {
                ...state,
                BuscadorGame:[...array1]
                }
        default:
            return {...state};
    }
}   