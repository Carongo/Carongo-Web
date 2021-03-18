import React, { useState } from 'react';import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import {Container, Form, Jumbotron, Button} from 'react-bootstrap';
import {useToasts} from "react-toast-notifications";

const EsqueciaSenha =()=>{
    const {addToast} = useToasts();
    const history = useHistory();
    const [email, setEmail] = useState('');

    const Recuperar =(event)=>{

    event.preventDefault();
    console.log(email);

    fetch('http://localhost:5000/conta/solicitar-nova-senha', {
            method : 'POST',
            body : JSON.stringify({
                email : email,
            }),
            headers : {
                'content-type' : 'application/json'
            }
    })
    .then(response => response.json())
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
           
                <Container className="jumb" style={{minHeight: "75vh"}}>
                <Jumbotron className="text-center">
                     <Form >
                         <h1>Esqueci minha senha

                         </h1>
                         <p>Insira seu email para receber mais detalhes de como redefinir sua senha.</p>
                            <Form.Group controlId="formBasicEmail">
                            <Form.Control value={email} onChange={event=> setEmail(event.target.value)} type="email" placeholder="Digite seu email" />
                            </Form.Group>
                            <Button onClick={event => Recuperar(event)} style={{marginTop : '18px'}}  className='button' variant="dark" type="submit"> Enviar </Button>

                     </Form> 
                     </Jumbotron>

                </Container>
           
            
            <Rodape />
        </div>

    )

}

export default EsqueciaSenha;