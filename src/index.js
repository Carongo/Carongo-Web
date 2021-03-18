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
import EsqueciaSenha from './pages/esqueciasenha';
import Perfil from './pages/perfil';

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
      <RotaPrivadaNaoLogado path="/esqueci-minha-senha" component={EsqueciaSenha} /> 
      <RotaPrivadaNaoLogado path="/esqueci-minha-senha/redefinir-senha/token=:jwt" component={Cadastro} />

      <RotaPrivadaLogado path="/minhas-instituicoes" component={MinhasInstituicoes} /> {/*http://localhost:5000/, http://localhost:5000/instituicao/entrar-na-instituicao*/}
      <RotaPrivadaLogado path="/detalhes-da-instituicao/:idInstituicao" component={DetalhesDaInstituicao} />
      <RotaPrivadaLogado path="/pessoas-da-instituicao/:idInstituicao" component={PessoasDaInstituicao} />
      <RotaPrivadaLogado path="/meu-perfil" component={Perfil} /> {/*http://localhost:5000/conta/listar-meu-perfil, http://localhost:5000/conta/alterar-usuario, http://localhost:5000/conta/alterar-senha, http://localhost:5000/conta/deletar-conta*/}
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
