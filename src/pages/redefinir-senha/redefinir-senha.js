import React, { useState } from 'react';
import './redefinir-senha.css';
import Rodape from '../../components/rodape';
import Menu from '../../components/menu'
import {useParams} from "react-router-dom"
import {useToasts} from "react-toast-notifications";
import {url} from "../../utils/constants";
import {  Button, Container, Jumbotron, Form } from 'react-bootstrap';

const Redefinir =()=>{
    const {addToast} = useToasts();
    const [senha, setSenha] = useState('');
    const {jwt} = useParams();

    const redefinicao = (event) => {
        event.preventDefault();
        fetch(`${url}/conta/redefinir-senha`,{
            method : 'PUT',
            body : JSON.stringify({
                senha : senha,
                token: jwt
            }),
            headers : {
                'content-type' : 'application/json'
            }
        })
        .then(resposta => resposta.json())
        .then(dados => {
            if(dados.sucesso){
                addToast(dados.mensagem, {
                    appearance : 'success',
                    autoDismiss : true
                });
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
              <Container className="cont" style={{minHeight: "75vh"}}>

       <Jumbotron  className='jumb'>
         <div className='text-center' >
         <h1 className="text-center">
           Redefinir senha
         </h1>

         </div>
       <Form >

       <Form.Group controlId="formBasicEmail">
       <Form.Label>Senha</Form.Label>
       <Form.Control value={senha} onChange={event=> setSenha(event.target.value)}  placeholder="Digite sua nova senha" />
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