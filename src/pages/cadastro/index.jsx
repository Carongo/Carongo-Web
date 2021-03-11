import React from 'react';
import{ Jumbotron, Container, Form, Button, } from 'react-bootstrap';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';

import './index.css';

const Cadastro =()=>{
    return(

        <div>
            <Menu />
            <Container className="container">

                <Jumbotron className='jumb'>

                <Form >
                    
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Nome</Form.Label>
    <Form.Control type="email" placeholder="Digite seu nome" />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="Digite seu email" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Senha</Form.Label>
    <Form.Control type="password" placeholder="Digite sua senha" />
  </Form.Group>
  
  <Button className='button' variant="dark" type="submit">
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