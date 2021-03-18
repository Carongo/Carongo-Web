import React, {useEffect, useState} from "react";
import {url} from "../../utils/constants";
import {InputGroup, Container, Dropdown, Col, Form, FormControl, Spinner, Row, Card, Modal, Button} from "react-bootstrap";
import {useToasts} from "react-toast-notifications";
import Menu from "../../components/menu/index";
import Rodape from "../../components/rodape/index"
const Instituicao = ({id, nome, descricao, tipoUsuario}) => {
    return (
        <Card style={{ width: '18rem', margin: "20px auto" }}>
            <Card.Body>
                <Card.Title>{nome}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Cargo: {tipoUsuario}</Card.Subtitle>
                <Card.Text>
                    {descricao}
                </Card.Text>
                <Card.Link href={`detalhes-da-instituicao/${id}`}>Ver detalhes</Card.Link>
            </Card.Body>
        </Card>
    )
}

const MinhasInstituicoes = () => {
    const [nome, setNome] = useState("");
    const [instituicoes, setInstituicoes] = useState([]);
    const {addToast} = useToasts();
    const [msg, setMsg] = useState("");

    const [showModalCriarInstituicao, setShowModalCriarInstituicao] = useState(false);
    const handleCloseModalCriarInstituicao = () => setShowModalCriarInstituicao(false);
    const handleShowModalCriarInstituicao = () => setShowModalCriarInstituicao(true);

    const [showModalEntrarNaInstituicao, setShowModalEntrarNaInstituicao] = useState(false);
    const handleCloseModalEntrarNaInstituicao = () => setShowModalEntrarNaInstituicao(false);
    const handleShowModalEntrarNaInstituicao = () => setShowModalEntrarNaInstituicao(true);

    const ModalCriarInstituicao = () => {
        const [nomeInstituicao, setNomeInstituicao] = useState("");
        const [descricaoInstituicao, setDescricaoInstituicao] = useState("");

        const criarInstituicao = async () => {
            const response = await fetch(`${url}/instituicao/criar-instituicao`, {
                method: "POST",
                body: JSON.stringify({
                    nome: nomeInstituicao,
                    descricao: descricaoInstituicao
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
                handleCloseModalCriarInstituicao();
            } 
            else {
                addToast(dados.mensagem, {
                    appearance : 'error',
                    autoDismiss : true
                })
            }
        }

        return <Modal show={showModalCriarInstituicao} onHide={handleCloseModalCriarInstituicao}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar Instituicao</Modal.Title>
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
                                    value={nomeInstituicao} 
                                    onChange={event => setNomeInstituicao(event.target.value)}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="Descrição" 
                                    placeholder="Descrição"  
                                    value={descricaoInstituicao} 
                                    onChange={event => setDescricaoInstituicao(event.target.value)}
                                    required />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleCloseModalCriarInstituicao}>
                    Cancelar
                </Button>
                <Button type="submit" onClick={() => criarInstituicao()} variant="dark"> Salvar</Button>
            </Modal.Footer>
        </Modal>
    }

    const ModalEntrarNaInstituicao = () => {
        const [codigo, setCodigo] = useState("");

        const entrarNaInstituicao = async () => {
            const response = await fetch(`${url}/instituicao/entrar-na-instituicao`, {
                method: "PUT",
                body: JSON.stringify({
                    codigo: codigo
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
                handleCloseModalEntrarNaInstituicao();
            } 
            else {
                addToast(dados.mensagem, {
                    appearance : 'error',
                    autoDismiss : true
                })
            }
        }

        return <Modal show={showModalEntrarNaInstituicao} onHide={handleCloseModalEntrarNaInstituicao}>
            <Modal.Header closeButton>
                <Modal.Title>Entrar na instituicao</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Codigo</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="Codigo" 
                                    placeholder="Codigo"  
                                    value={codigo} 
                                    onChange={event => setCodigo(event.target.value)}
                                    required />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleCloseModalEntrarNaInstituicao}>
                    Cancelar
                </Button>
                <Button type="submit" onClick={() => entrarNaInstituicao()} variant="dark"> Salvar</Button>
            </Modal.Footer>
        </Modal>
    }

    useEffect(() => {
        listar()
    }, [nome])

    const listar = async () => {
        const response = await fetch(`${url}/instituicao/listar-minhas-instituicoes/${nome !== null ? nome : null}`, {
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
            }
        })
        const data = await response.json();

        if(!data.sucesso)
            addToast(data.mensagem, {
                appearance : 'error',
                autoDismiss : true
            })
        else{
            setMsg(data.mensagem)
            setInstituicoes(data)
        }
            
    }

    return (
        <>
            <Menu/>
            <Container style={{width: "95vw", marginTop: "25px", minHeight: "90vh"}}>
                <div style={{textAlign: "right"}}>
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <i className="fas fa-ellipsis-v" style={{fontSize: "20px"}}></i><i className="fas fa-ellipsis-v" style={{fontSize: "20px"}}></i><i className="fas fa-ellipsis-v" style={{fontSize: "20px"}}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <ModalCriarInstituicao/>
                            <Dropdown.Item onClick={handleShowModalCriarInstituicao}>Criar instituição</Dropdown.Item>
                            <ModalEntrarNaInstituicao/>
                            <Dropdown.Item onClick={handleShowModalEntrarNaInstituicao}>Entrar em uma instituição</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Form style={{marginTop: "50px"}}> 
                    <Form.Row className="align-items-center justify-content-center">
                        <Col xs="auto">
                            <InputGroup className="mb-2">
                                <FormControl id="inlineFormInputGroup" name="nome" placeholder="Pesquisar por nome..." value={nome} onChange={event => setNome(event.target.value)}/>
                            </InputGroup>
                        </Col>
                    </Form.Row>
                </Form>
                <hr></hr>
                <Container fluid>
                    <Row style={{display: "flex", flexWrap: "wrap"}}>
                        {
                            msg ==="Você não faz parte de nenhuma instituição!"?
                            <div style={{width: "100%", marginTop: 25}}>
                                
                            <h3 style={{textAlign: "center"}}>Você ainda não faz parte de nenhuma instituição!</h3>
                            </div>:
                            instituicoes.dados === undefined?
                            <div style={{width: "83vw", display: "flex", justifyContent: "center"}}>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                            
                            :
                            instituicoes.dados.map((instituicao, index) => {
                                return <Instituicao id={instituicao.id} nome={instituicao.nome} descricao={instituicao.descricao} tipoUsuario={instituicao.tipoUsuario}/>
                            })
                        }
                    </Row>
                </Container>
            </Container>
                <Rodape/>
        </>
    )
}

export default MinhasInstituicoes;