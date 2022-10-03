const { Router } = require('express');
const {key,Genero } = require('../db');
const models = require('./funciones')
const { routes } = require('../app');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", (req, res)=>{
  res.send("el servidor se levanto")
})

router.post("/genero" , async( req,res)=>{
  const {genero}= req.body;
  try {
    res.json( await models.CrearGenero(genero));
  } catch (e) {
    res.send(e);
  }
})
//Ruta para crear juego
router.post("/VideoJuego", async (req, res)=>{
  let {name, fecha, Rating,Generos,Plataformas,Descripcion,image } = req.body.data;
  if(!Plataformas){
    res.json("Debe seleccionar almenos una plataforma")
  }


  try {
    //Crear generos si no existen
    await Promise.all( Generos.map( async (g) => await models.CrearGenero(g)))
      res.json( await models.CrearVideojuego(
        { name,
          image, 
          description:Descripcion ,
          rating:Number(Rating) , 
          released:fecha,
          parent_platforms:Plataformas,
          Generos:Generos
        }));
  } catch (e) {
    res.send(e)
  }
})
//consultar todos los juegos
router.get("/videogames" ,async (req, res)=>{
  try {
    res.json( await models.GetVideojuego());
  } catch (e) {
    res.send(e)
  }
})
//consultar juego por id
router.get("/videogames/:id" ,async (req, res)=>{
  let {id} = req.params;
  try {
    res.json( await models.GetVideojuego(id));
  } catch (e) {
    res.send(e)
  }
})


module.exports = router;
