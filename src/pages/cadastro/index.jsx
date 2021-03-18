import React, { useState } from 'react';
import{ Jumbotron, Container, Form, Button, } from 'react-bootstrap';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';


import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";









const Cadastro =()=>{
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');

  const Cadastrar =(event)=>{

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
    .then(data => {
        //salva o token no localstorage
        localStorage.setItem('token-carango', data.token);
        //decodifica o Data.token
        let usuario = jwt_decode(data.token)
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
            
            <Button  onClick={event => Cadastrar(event)} className='button' variant="dark" type="submit">
              Cadastrar
            </Button>

  
        </Form>

                </Jumbotron>


            </Container>
            <Rodape />

        </div>
    )
}
 

export default Cadastro;