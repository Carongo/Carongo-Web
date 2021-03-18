import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { Form, Button, Container, Jumbotron } from 'react-bootstrap';
import {url} from "../../utils/constants";
import {useToasts} from "react-toast-notifications";
import './login.css';

const Login =() =>{
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const {addToast} = useToasts();
    
    const logar=(event)=>{
        event.preventDefault();

        fetch(`${url}/conta/entrar`, {
            method : 'POST',
            body : JSON.stringify({
                email : email,
                senha : senha
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

    return (
            
        <div>
            <Menu />
            <Container className="cont">
                <Jumbotron  className='jumb'>
                    <div className='text-center' >
                        <h1 className="text-center">
                            Login
                        </h1>
                    </div>
                    <Form >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={email} onChange={event=> setEmail(event.target.value)} type="email" placeholder="Digite seu email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control value={senha} onChange={event=> setSenha(event.target.value)} type="password" placeholder="Digite sua senha" />
                        </Form.Group>

                        
                        <Button style={{marginTop : '18px'}} onClick={event => logar(event)}  className='button' variant="dark" type="submit">
                            Entrar
                        </Button><div className="op" style={{marginTop: "25px"}} >
                            <a href="/cadastro">Cadastre-se</a>
                            <a href="/esqueci-minha-senha">Esqueci minha senha</a>
                        </div>
                    </Form>
                </Jumbotron>
            </Container>
            <Rodape />
        </div>
    );
}

export default Login;