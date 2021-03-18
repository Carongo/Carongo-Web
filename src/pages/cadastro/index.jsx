import React, { useState } from 'react';
import{ Jumbotron, Container, Form, Button, } from 'react-bootstrap';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import {useToasts} from "react-toast-notifications";

import "./cadastro.css"

import { useHistory } from 'react-router-dom';









const Cadastro =()=>{
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const {addToast} = useToasts();

  const cadastrar =(event)=>{

    event.preventDefault();
    console.log(nome + email + senha);

    fetch('http://localhost:5000/conta/cadastrar-se',{
        method : 'POST',
        body : JSON.stringify({
            email : email,
            senha : senha,
            nome : nome 
        }),
        headers : {
            'content-type' : 'application/json'
        }
    })
    .then(response => {
       if(response.ok){
           return response.json();
       }
       alert('dados invalidos');
    })
    .then(dados => {
        if(dados.sucesso){
            addToast(dados.mensagem, {
                appearance : 'success',
                autoDismiss : true
            });
            localStorage.setItem('token-carongo', dados.dados);
            history.push('/minhas-instituicoes')
        } 
        else {
            addToast(dados.mensagem, {
                appearance : 'error',
                autoDismiss : true
            })
        }
    })
    .catch(err => console.error(err));


}
    return(

        <div>
            <Menu />
            <Container className="cont">

                <Jumbotron  className='jumb'>

            <div className='text-center' >
                <h1>
                    Cadastro
                </h1>
           </div>

       <Form >
                               
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control value={nome} onChange={event=> setNome(event.target.value)} type="name" placeholder="Digite seu nome" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control value={email} onChange={event=> setEmail(event.target.value)}  type="email" placeholder="Digite seu email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control value={senha} onChange={event=> setSenha(event.target.value)} type="password" placeholder="Digite sua senha" />
            </Form.Group>
            
            <Button  onClick={event => cadastrar(event)} className='button' variant="dark" type="submit">
              Cadastrar
            </Button>
            <div style={{marginTop: "25px"}}>
                            <a href="/login">Já é cadastrado? Faça login</a>

            </div>
  
        </Form>

                </Jumbotron>


            </Container>
            <Rodape />

        </div>
    )
}
 

export default Cadastro;