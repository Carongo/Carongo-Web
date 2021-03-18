import React, { useState } from 'react';
import './login.css';
import { useHistory } from 'react-router-dom';




import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { Form, Button, InputGroup, FormControl, Container, Jumbotron } from 'react-bootstrap';



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
            history.push('/minhas-instituicoes')
            
        })
        .catch(err => console.error(err));


    }

    return(
            
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

      <div className="op" >
          <a href="/cadastro">Cadastre-se</a>
          <a href="/esqueci-minha-senha">Esqueci minha senha</a>
      </div>

      <Button style={{marginTop : '18px'}} onClick={event => logar(event)}  className='button' variant="dark" type="submit">
      Entrar
      </Button>
      </Form>

      </Jumbotron>



      </Container>
     
       

        
        

       
     <Rodape />

    </div>

    );
    
}

export default Login;