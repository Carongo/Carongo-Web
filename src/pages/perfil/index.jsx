import React from 'react';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import {Container, Jumbotron, Form, Button} from 'react-bootstrap';

import imglog from './image/imglog.png'


const Perfil =()=>{
    return(
        <div>
            <Menu />

            <Container className="container">

<Jumbotron  className='jumb'>
<div className='text-center' >
<img alt="Carongo" src={imglog} style={{ width : '175px'}} />

</div>

<Form >
<h1 style={{color : '#FF6900'}}>Perfil</h1>
    
<Form.Group controlId="formBasicEmail">
<Form.Label>Nome</Form.Label>
<Form.Control type="name" placeholder="Digite seu nome" />
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
Salvar
</Button>
</Form>

</Jumbotron>



</Container>
            <Rodape />
        </div>

    )
}

export default Perfil;