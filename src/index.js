import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Home from './pages/home';
import DetalhesDaInstituicao from "./pages/detalhes-da-instituicao/detalhes-da-instituicao";
import PessoasDaInstituicao from "./pages/pessoas-da-instituicao/pessoas-da-instituicao";
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
  <Router>
    <Switch>
      <RotaPrivadaNaoLogado exact path="/" component={Home} />
      <RotaPrivadaNaoLogado path="/login" component={Login} /> {/*http://localhost:5000/conta/entrar*/}
      <RotaPrivadaNaoLogado path="/cadastro" component={Cadastro} /> {/*http://localhost:5000/conta/cadastrar-se*/}
      <RotaPrivadaNaoLogado path="/esqueci-minha-senha" component={Cadastro} /> {/*http://localhost:5000/conta/solicitar-nova-senha*/}
      <RotaPrivadaNaoLogado path="/esqueci-minha-senha/redefinir-senha/:jwt" component={Cadastro} /> {/*http://localhost:5000/conta/redefinir-senha*/}

      <RotaPrivadaLogado path="/minhas-instituicoes" component={Cadastro} /> {/*http://localhost:5000/instituicao/listar-minhas-instituicoes, http://localhost:5000/instituicao/criar-instituicao, http://localhost:5000/instituicao/entrar-na-instituicao*/}
      <RotaPrivadaLogado path="/detalhes-da-instituicao/:idInstituicao" component={DetalhesDaInstituicao} /> {/*http://localhost:5000/instituicao/alterar-instituicao*/}
      <RotaPrivadaLogado path="/pessoas-da-instituicao/:idInstituicao" component={PessoasDaInstituicao} /> {/*http://localhost:5000/instituicao/listar-pessoas-da-instituicao/F6F08E78-CCBC-4C97-9673-B03B3F592C67, http://localhost:5000/instituicao/adicionar-administrador, http://localhost:5000/instituicao/expulsar-colaborador*/}
      <RotaPrivadaLogado path="/meu-perfil" component={Cadastro} /> {/*http://localhost:5000/conta/listar-meu-perfil, http://localhost:5000/conta/alterar-usuario, http://localhost:5000/conta/alterar-senha, http://localhost:5000/conta/deletar-conta*/}
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
