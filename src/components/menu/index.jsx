import React from "react";
import{Navbar, Nav, NavDropdown} from 'react-bootstrap';
import logo from '../../assets/img/logo02.png'
import {useHistory} from 'react-router-dom';


const Menu=()=> {
    const history = useHistory();

    const sair = (event)=>{
        event.preventDefault();

        localStorage.removeItem('token-carongo');

        history.push('/')
    }

    const renderMenu = () =>{
        const token = localStorage.getItem('token-carongo');
        
        if(token === null){
          return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <a href="/"><img  alt="Carongo" src={logo} style={{ width : '175px'}} /></a>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/cadastro">Cadastre-se</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          );
        }
        else {
            return(
                <div>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="/pages/home">Carongo</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                              <Nav className="mr-auto">
                                <Nav.Link href="/pages/login">Login</Nav.Link>
                                <Nav.Link href="/pages/cadastro">Cadastre-se</Nav.Link>
                                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                              </Nav>
                                <Nav>
                                    <Nav.Link href="#deets">More deets</Nav.Link>
                                    <Nav.Link eventKey={2} href="#memes">
                                        Dank memes
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                      </Navbar>
                </div>
            )
        }
    }

    return (
        <div>
            {renderMenu()}
        </div>
    )
}

export default Menu;