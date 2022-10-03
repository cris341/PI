const {Genero, Videojuego} = require('../db.js');
const { Op } = require("sequelize");
module.exports = {
    //crear genero
    CrearGenero: async (genero)=>{
        let existeGenero = await Genero.findAll({where:{Nombre: genero}});
        if (existeGenero.length != 0) {
            return ("El genero ya esta creado");  
        }else{
            await Genero.create({Nombre:genero})
            return `Èl genero ${genero} fue creado con exito`
        }
    },
    //crear videojuego
    CrearVideojuego: async ({name, image,description,rating, released,parent_platforms,Generos})=>{
        let arrayGenero = [];
        let genero = await Genero.findAll({attributes: ["id"],where: {Nombre: {[Op.or]: Generos}}})
        genero.map(g =>{arrayGenero.push(g.id) })
        let existeJuego = await Videojuego.findAll({ where:{Nombre: name}})
        if (existeJuego.length != 0) {
            return ("El video juego ya existe");  
        }else{ 
            let player =await Videojuego.create(
                {
                    Nombre:name, 
                    Descripcion:description, 
                    Fecha_de_lanzamiento:released, 
                    Rating:rating , 
                    Plataformas: parent_platforms,
                    image:image
                })
                await player.addGeneros(arrayGenero);
            return `Èl videojuego ${name} fue creado con exito`
        }
    },
    //consultar juegos
    GetVideojuego: (id)=>{
        let videojuego =[];
        if(id){
            videojuego = Videojuego.findOne({
                where:{id: id},
                include: 
                    {
                    model:Genero,
                    attributes:['Nombre']
                    }
                
            })
        }else{
            videojuego = Videojuego.findAll({
                include: 
                    {
                    model:Genero,
                    attributes:['Nombre']
                    }
                
            })
    
        }
        return videojuego;
        
    }



    

}