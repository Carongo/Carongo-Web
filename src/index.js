import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Home from './pages/home';
import EsqueciaSenha from './pages/esqueciasenha';
import Perfil from './pages/perfil';



const routing = (
  <Router>
    <Switch>
      <Route  path="/pages/login" component={Login} />
      <Route  path="/pages/cadastro" component={Cadastro} />
      <Route  path="/pages/esqueciasenha" component={EsqueciaSenha} />
      <Route  path="/pages/perfil" component={Perfil} />

     <Route  path="/" component={Home} />



      
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
