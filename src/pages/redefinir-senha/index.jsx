import { Form } from 'formik';
import React, { useState } from 'react';
import './redefinir.css';
import Rodape from '../../components/rodape';
import Menu from '../../components/menu'
import { useHistory } from 'react-router-dom';

import jwt_decode from "jwt-decode";



import {  Button, Container, Jumbotron } from 'react-bootstrap';



const Redefinir =()=>{
    const history = useHistory();
    const [email, setEmail] = useState('');

    const redefinicao =(event)=>{
        event.preventDefault();
        console.log(email);      
    }
    fetch('http://localhost:5000/conta/redefinir-senha',{
            method : 'POST',
            body : JSON.stringify({
                email : email,
            }),
            headers : {
                'content-type' : 'application/json'
            }
        })
        .then(resposta => {
           if(resposta.ok){
               return resposta.json();
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


    


    return(
        <div>
            <Menu />
              <Container className="cont">
       
       <Jumbotron  className='jumb'>
         <div className='text-center' >
         <h1 className="text-center">
           Redefiir senha
         </h1>
        
         </div>
       <Form >
 
       <Form.Group controlId="formBasicEmail">
       <Form.Label>Email</Form.Label>
       <Form.Control value={email} onChange={event=> setEmail(event.target.value)}  type="email" placeholder="Digite seu email" />
       </Form.Group>
 
       <Button onClick={event => redefinicao(event)} className='button' variant="dark" type="submit">
       Redefinir
       </Button>
       </Form>
 
       </Jumbotron>
 
 
 
       </Container>
            <Rodape />
        </div>

    )
}

export default Redefinir;