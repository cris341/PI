import {  Route,  Switch } from 'react-router-dom';
import './App.css';
import Detalle from './components/detalles/detalle';
import Games from './components/Games/Games';
import AñadirJuego from './components/AñadirGame/AñadirGame';
import Inicio from './components/index.js';
import Error_route from './components/error_route/error';
function App() {
  return (
    <div className="App">
      <Switch>
            <Route exact path="/" component={Inicio} />
            <Route  path="/home" component={Games} />
            <Route path="/Crear_juego" component={AñadirJuego} /> 
            <Route  path="/detalles/:id" component={Detalle} />
            <Route  path="*" component={Error_route}/>
      </Switch>
    
    </div>
  );
}

export default App;
