import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Home from './pages/home/index';
import DetalhesDaInstituicao from "./pages/detalhes-da-instituicao/detalhes-da-instituicao";
import PessoasDaInstituicao from "./pages/pessoas-da-instituicao/pessoas-da-instituicao";
import MinhasInstituicoes from "./pages/minhas-instituicoes/minhas-instituicoes";
import RedefinirSenha from './pages/redefinir-senha/redefinir-senha';
import EsqueciaSenha from './pages/esqueciasenha';

import { ToastProvider } from 'react-toast-notifications';

const RotaPrivadaLogado = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render= {
      props => 
      localStorage.getItem("token-carongo") !== null ?
        <Component {...props}/> :
        <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
    }
  />
);


const RotaPrivadaNaoLogado = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render= {
      props => 
      localStorage.getItem("token-carongo") === null ?
        <Component {...props}/> :
        <Redirect to={{pathname: "/minhas-instituicoes", state: {from: props.location}}}/>
    }
  />
);

const routing = (
  <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <RotaPrivadaNaoLogado exact path="/" component={Home} />
      <RotaPrivadaNaoLogado path="/login" component={Login} /> 
      <RotaPrivadaNaoLogado path="/cadastro" component={Cadastro} />
      <RotaPrivadaNaoLogado exact path="/esqueci-minha-senha" component={EsqueciaSenha} /> 
      <RotaPrivadaNaoLogado path="/esqueci-minha-senha/redefinir-senha/:jwt" component={RedefinirSenha} />

      <RotaPrivadaLogado path="/minhas-instituicoes" component={MinhasInstituicoes} /> 
      <RotaPrivadaLogado path="/detalhes-da-instituicao/:idInstituicao" component={DetalhesDaInstituicao} />
      <RotaPrivadaLogado path="/pessoas-da-instituicao/:idInstituicao" component={PessoasDaInstituicao} />
    </Switch>
  </Router>
)

ReactDOM.render(
  <ToastProvider>
    {routing}
  </ToastProvider>,
  document.getElementById('root')
);

serviceWorker.register();
