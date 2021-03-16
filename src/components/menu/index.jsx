import React, {Component} from "react";
import{Navbar, Nav, NavDropdown, Form, Button, FormControl, Jumbotron, Container} from 'react-bootstrap';
import './index.css';
import logo from './image/logo.jpeg'
import jwt_decode from "jwt-decode";
import {useHistory} from 'react-router-dom';


const Menu=()=> {
    const history = useHistory();
    const Sair =(event)=>{
        event.preventDefault();
        //remove token para sair do login/sessão
        localStorage.removeItem('token-carango');

        history.pushState('/')
    }

    const renderMenu = () =>{
        const token = localStorage.getItem('token-carango');

        if(token === null){
            return(
                <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-sm-2">
    <Form inline>
      <Nav.Link href="/login" style={{color : 'white'}}>Login</Nav.Link>
      <Nav.Link href="/cadastro" style={{color : 'white'}}>Cadastro</Nav.Link>  
        
   </Form> 
     </Nav>
  </Navbar.Collapse>

            );
            //mudança...
        }else if(jwt_decode(token).role === 'admin'){
            return(
         <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-sm-2">
              <Form inline>
                  <Nav.Link href="/login" style={{color : 'white'}}>Home</Nav.Link>
                  <Nav.Link href="/cadastro" style={{color : 'white'}}>Login</Nav.Link>
                  <Nav.Link href="/sair" onClick={event => Sair(event)} style={{color : 'white'}}>sair</Nav.Link>           
               </Form> 
         </Nav>
         </Navbar.Collapse>
                
            )
        }else {
            return(
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-sm-2">
                <Form inline>
                  <Nav.Link href="/login" style={{color : 'white'}}>Home</Nav.Link>
                  <Nav.Link href="/cadastro" style={{color : 'white'}}>Login</Nav.Link>  
                    
               </Form> 
                 </Nav>
              </Navbar.Collapse>
               
            )

        }
      

    }
        return (
         <div>
        <Navbar style={{backgroundColor : 'black'}}>
  <Navbar.Brand href="#"></Navbar.Brand>
  <img alt="Carongo" src={logo} style={{ width : '150px', alignItems : 'center' }}/>

  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-sm-2">
    <Form inline>
    {renderMenu()}
   </Form> 
     </Nav>
  </Navbar.Collapse>

        </Navbar>

        </div>
        )
    }


export default Menu;