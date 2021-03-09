import React from 'react';
import logo from './logo.svg';
import './App.css';
//Importa os componentes criados
import Rodape from "./components/rodape";
import Titulo from "./components/titulo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Titulo titulo="Login" descricao="Já é cadastrado? Faça login!"></Titulo>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Rodape></Rodape>
    </div>
  );
}

export default App;