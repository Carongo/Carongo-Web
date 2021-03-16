import React, { useState } from 'react';
import './index.css';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";


import{ Jumbotron, Container, Form, Button, } from 'react-bootstrap';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';



const Login =() =>{
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const logar=(event)=>{
        event.preventDefault();
        console.log(email + senha);

        fetch('http://localhost:5000/conta/entrar',{
            method : 'POST',
            body : JSON.stringify({
                email : email,
                senha : senha
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
            //salva o token no localstorage
            localStorage.setItem('token-carongo', dados.dados);
            //decodifica o Data.token
            let usuario = jwt_decode(dados.token)
            console.log(usuario)
            //redireciona para a ..... apos o login
            history.push('/....')
            
        })
        .catch(err => console.error(err));


    }

    return(
            
    <div>
        <Menu />
    <Container className="container">

      <Jumbotron className='jumb'>
 <Form >
    <Form.Group controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" value={email} onChange={event=> setEmail(event.target.value)} placeholder="Digite seu email" />

    </Form.Group>

    <Form.Group controlId="formBasicPassword">
    <Form.Label>Senha</Form.Label>
    <Form.Control type="password" value={senha} onChange={event=> setSenha(event.target.value)} placeholder="Digite sua senha" />
    </Form.Group>
        <container class='accont'>
            <div>
            <a href="#esqueciminhasenha">Esqueci minha senha</a>
            </div>

            <div>
            <a href="/cadastro">Criar conta</a>
            </div>

        </container>

    <Button style={{marginTop : '18px'}} onClick={event => logar(event)}  className='button' variant="dark" type="submit">
         Login
    </Button>
</Form>

     </Jumbotron>
        </Container>
     <Rodape />

    </div>

    );
    
}

export default Login;