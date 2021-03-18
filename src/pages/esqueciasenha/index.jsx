import React, { useState } from 'react';import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { useHistory } from 'react-router-dom';
import {Container, Form, Jumbotron, Button} from 'react-bootstrap';
import './style.css'

const EsqueciaSenha =()=>{
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
    .then(data => {
       //notifications
        history.push('....')
    })
    .catch(err => console.error(err));


    
    






    }
    return(
        <div>
            <Menu />
           
                <Container className="jumb">
                <Jumbotron className="text-center">
                     <Form >
                         <h1>Recupere sua senha

                         </h1>
                         <p>Insira seu email para Recuperar sua conta.</p>
                            <Form.Group controlId="formBasicEmail">
                            <Form.Control value={email} onChange={event=> setEmail(event.target.value)} type="email" placeholder="Digite seu email" />
                            </Form.Group>
                            <Button onClick={event => Recuperar(event)} style={{marginTop : '18px'}}  className='button' variant="dark" type="submit"> Recuperar </Button>

                     </Form> 
                     </Jumbotron>

                </Container>
           
            
            <Rodape />
        </div>

    )

}

export default EsqueciaSenha;