import React, {useState, useEffect} from "react";
import{Navbar, Nav, Dropdown, DropdownButton, ButtonGroup, Button, Modal, Form, Card } from 'react-bootstrap';
import logo from '../../assets/img/logo.jpeg'
import {useHistory} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import {url} from "../../utils/constants";
import {useToasts} from "react-toast-notifications";

const Menu=({idInstituicao, pagina})=> {
    const history = useHistory();
    const [perfil, setPerfil] = useState({});

    const sair = ()=>{
      let resposta = window.confirm("Tem certeza de que deseja fazer logout?")
      if(resposta){
        localStorage.removeItem('token-carongo');

        history.push('/')
      }
    }

    useEffect(() => {
      listar();
    }, [])

    const listar = async () => {
      const response = await fetch(`${url}/conta/listar-meu-perfil`, {
        headers: {
            "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
        }
      });
      const data = await response.json();
      setPerfil(data.dados);
    }

    const MeuPerfil = () => {
      const [showModalAlterarPerfil, setShowModalAlterarPerfil] = useState(false);
      const handleCloseModalAlterarPerfil = () => setShowModalAlterarPerfil(false);
      const handleShowModalAlterarPerfil = () => setShowModalAlterarPerfil(true);

      const [showModalAlterarSenha, setShowModalAlterarSenha] = useState(false);
      const handleCloseModalAlterarSenha = () => setShowModalAlterarSenha(false);
      const handleShowModalAlterarSenha = () => setShowModalAlterarSenha(true);
      
      const {addToast} = useToasts();

      const ModalEditarPerfil = () => {
        const [nome, setNome] = useState(perfil.nome);
        const [email, setEmail] = useState(perfil.email);

        const alterarPerfil = async () => {
            const response = await fetch(`${url}/conta/alterar-usuario`, {
                method: "PUT",
                body: JSON.stringify({
                    email: email,
                    nome: nome
                }),
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
                }
            })

            const dados = await response.json()
            
            
            if(dados.sucesso){
              addToast(dados.mensagem, {
                  appearance : 'success',
                  autoDismiss : true
              });
              listar();
                handleCloseModalAlterarPerfil();
          } 
          else {
              addToast(dados.mensagem, {
                  appearance : 'error',
                  autoDismiss : true
              })
          }
        }

        return <Modal show={showModalAlterarPerfil} onHide={handleCloseModalAlterarPerfil}>
            <Modal.Header closeButton>
                <Modal.Title>Alterar perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="Nome" 
                                    placeholder="Nome"  
                                    value={nome} 
                                    onChange={event => setNome(event.target.value)}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="Email" 
                                    placeholder="Email"  
                                    value={email} 
                                    onChange={event => setEmail(event.target.value)}
                                    required />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleCloseModalAlterarPerfil}>
                    Cancelar
                </Button>
                <Button type="submit" onClick={() => alterarPerfil()} variant="dark"> Salvar</Button>
            </Modal.Footer>
        </Modal>
      }

      const ModalAlterarSenha = () => {
        const [senhaAtual, setSenhaAtual] = useState("");
        const [senhaNova, setSenhaNova] = useState("");

        const alterarSenha = async () => {
            const response = await fetch(`${url}/conta/alterar-senha`, {
                method: "PUT",
                body: JSON.stringify({
                    senhaAtual: senhaAtual,
                    senhaNova: senhaNova
                }),
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
                }
            })

            const dados = await response.json()

            if(dados.sucesso){
              addToast(dados.mensagem, {
                  appearance : 'success',
                  autoDismiss : true
              });
              listar();
              handleCloseModalAlterarSenha();
          } 
          else {
              addToast(dados.mensagem, {
                  appearance : 'error',
                  autoDismiss : true
              })
          }
            
        }

        return <Modal show={showModalAlterarSenha} onHide={handleCloseModalAlterarSenha}>
            <Modal.Header closeButton>
                <Modal.Title>Alterar senha</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Senha atual</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="Senhaatual" 
                                    placeholder="Senha atual"  
                                    value={senhaAtual} 
                                    onChange={event => setSenhaAtual(event.target.value)}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Senha nova</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="SenhaNova" 
                                    placeholder="Senha nova"  
                                    value={senhaNova} 
                                    onChange={event => setSenhaNova(event.target.value)}
                                    required />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleCloseModalAlterarSenha}>
                    Cancelar
                </Button>
                <Button type="submit" onClick={() => alterarSenha()} variant="dark"> Salvar</Button>
            </Modal.Footer>
        </Modal>
      }

      const deletarPerfil = async () => {
        const resposta = window.confirm("Tem certeza de que deseja deletar sua conta? Todos os dados relacionados a ela também serão excluídos.");
        if(resposta){
          const response = await fetch(`${url}/usuario/deletar-conta`, {
            method: "DELETE",
            body: null,
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
            }
          });
          const data = await response.json();
          if(data.sucesso) {
            addToast(data.mensagem, {appearance: "success", autoDismiss: true});
            localStorage.removeItem("token-carongo");
            history.push("/")
          }
          else {
            addToast(data.mensagem, {appearance: "error", autoDismiss: true});
          }
        } 
        
    }

      return <div className="mb-2">
        {['left'].map((direction) => (
          <DropdownButton
            as={ButtonGroup}
            key={direction}
            id={`dropdown-button-drop-${direction}`}
            drop={direction}
            variant="primary"
            title={` ${jwt_decode(localStorage.getItem("token-carongo")).nome} `}
          >
            <Dropdown.Header>{perfil.nome}</Dropdown.Header>
            <Dropdown.Header>{perfil.email}</Dropdown.Header>
            <hr></hr>
            <ModalEditarPerfil/>
            <Dropdown.Item eventKey="1" onClick={handleShowModalAlterarPerfil}>Editar perfil</Dropdown.Item>
            <ModalAlterarSenha/>
            <Dropdown.Item eventKey="2" onClick={handleShowModalAlterarSenha}>Alterar senha</Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={sair}><i class="fas fa-sign-out-alt"></i> Logout</Dropdown.Item>
            <Dropdown.Item style={{color: "red"}} onClick={deletarPerfil}><i class="fas fa-trash-alt"></i> Deletar conta</Dropdown.Item>
          </DropdownButton>
        ))}
      </div>
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
        else if(pagina==="Detalhes") {
          return(
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href={`/minhas-instituicoes`}><i class="fas fa-arrow-left"></i></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                          <Nav className="mr-auto">
                            <Nav.Link href={`/pessoas-da-instituicao/${idInstituicao}`}>Pessoas da instituição</Nav.Link>
                          </Nav>
                            <Nav>
                                <Nav.Link><MeuPerfil/></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                  </Navbar>
            </div>
        )
        }
        else if(pagina==="Pessoas"){
            return(
                <div>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href={`/detalhes-da-instituicao/${idInstituicao}`}><i class="fas fa-arrow-left"></i></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                              <Nav className="mr-auto">
                                <Nav.Link href="/pages/login"></Nav.Link>
                              </Nav>
                              <MeuPerfil/>
                            </Navbar.Collapse>
                      </Navbar>
                </div>
            )
        }
        else if(idInstituicao===undefined){
          return(
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/minhas-instituicoes">Carongo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                          <Nav className="mr-auto">
                            <Nav.Link href="/minhas-instituicoes"></Nav.Link>
                          </Nav>
                            <Nav>
                                <Nav.Link><MeuPerfil/></Nav.Link>
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