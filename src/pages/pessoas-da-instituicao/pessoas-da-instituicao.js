import React, {useState, useEffect} from "react";
import {Container, ListGroup, Spinner, Form, Col, InputGroup, FormControl} from "react-bootstrap";
import { useParams } from "react-router";
import {url} from "../../utils/constants";
import {useToasts} from "react-toast-notifications";

import jwt_decode from "jwt-decode";

const Pessoa = ({id, idUI, nome, meuId, adm, idInstituicao, listar}) => {
    const {addToast} = useToasts();

    const expulsarColaborador = async (idUI) => {
        let resposta = window.confirm("Tem certeza de que deseja expulsar este colaborador?");
        if(resposta) {
            fetch(`${url}/instituicao/expulsar-colaborador`, {
                method: "DELETE",
                body: JSON.stringify({
                    idUsuarioInstituicao: idUI,
                    idInstituicao: idInstituicao
                }),
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
                }
            })
            .then(response => response.json())
            .then(dados => {
                if(dados.sucesso){
                    addToast(dados.mensagem, {
                        appearance : 'success',
                        autoDismiss : true
                    });
                    listar();
                } 
                else {
                    addToast(dados.mensagem, {
                        appearance : 'error',
                        autoDismiss : true
                    })
                }
            })
        }
    }

    return (
        <ListGroup.Item style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <div style={{display: "flex"}}>
                <div>
                    <div style={{height: "40px", width: "40px", background: id === meuId ? "#5C6BC0": "#fa6c09", borderRadius: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bolder", color: "white", marginRight: "10px"}}>
                        {nome.substring(0, 1).toUpperCase()}
                    </div>
                </div>
                <p style={{margin: "0", display: "flex", alignItems: "center"}}>{ id === meuId ? "Eu" : nome}</p>
            </div>
            {
                adm
                && 
                <div >
                    <i className="fas fa-trash-alt" style={{color: "red", cursor: "pointer"}} onClick={() => expulsarColaborador(idUI)}></i>
                </div>
            }
            
        </ListGroup.Item>
    )
}

const PessoasDaInstituicao = () => {
    const {addToast} = useToasts();
    const {idInstituicao} = useParams();
    const [pessoas, setPessoas] = useState([]);
    const [adm, setAdm] = useState(false);
    const [meuId, setMeuId] = useState("");
    const [emailUsuario, setEmailUsuario] = useState("");

    const listar = async () => {
        setMeuId(jwt_decode(localStorage.getItem("token-carongo")).jti);

        const response = await fetch(`${url}/instituicao/listar-pessoas-da-instituicao/${idInstituicao}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
            }
        });
        const data = await response.json();

        setAdm(data.dados.administradores.find(u => u.id === meuId) !== undefined ? true : false);
        
        setPessoas(data.dados);
    }

    useEffect(() => {
        listar();
    }, [meuId])

    const adicionarAdministrador = async (email) => {
        const response = await fetch(`${url}/instituicao/adicionar-administrador`, {
            method: "PUT",
            body: JSON.stringify({
                idInstituicao: idInstituicao,
                email: email,
                idUsuario: meuId
            }),
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
            }
        });
        const dados = await response.json();

        console.log(dados)

        if(dados.sucesso){
            addToast(dados.mensagem, {
                appearance : 'success',
                autoDismiss : true
            });
            listar();
        } 
        else {
            addToast(dados.mensagem, {
                appearance : 'error',
                autoDismiss : true
            })
        }
    }

    return (
        <>
            {
                adm && <>
                    <Form style={{marginTop: "50px"}}> 
                        <Form.Row className="align-items-center justify-content-center">
                            <Col xs="auto">
                                <p style={{textAlign: "center"}}>Adicionar administrador</p>
                                <InputGroup className="mb-2">
                                    <FormControl id="inlineFormInputGroup" name="nome" placeholder="Email" value={emailUsuario} onChange={event => setEmailUsuario(event.target.value)}/>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text style={{cursor: "pointer"}} onClick={() => adicionarAdministrador(emailUsuario)}>
                                            <i className="fas fa-plus"></i>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </Col>
                        </Form.Row>
                    </Form>
                    <p style={{textAlign: "center"}}>Convide colaboradores com o código: <span style={{color: "#0069d9", fontWeight: "bolder"}}>{pessoas.codigo}</span></p>
                </>
            }
            <Container style={{width: "90%"}}>
                {
                    pessoas.colaboradores !== undefined && pessoas.administradores !== undefined?
                        <div>
                            <h2 style={{marginTop: "50px"}}>Administradores</h2>
                            <ListGroup variant="flush">
                                <Container fluid>
                                    {
                                        pessoas.administradores.map((administrador, index) => {
                                            return <Pessoa id={administrador.id} nome={administrador.nome} meuId={meuId} key={index}/>
                                        })
                                    }
                                </Container>
                            </ListGroup>
                            <h2 style={{marginTop: "50px"}}>Colaboradores</h2>
                            <ListGroup variant="flush">
                                <Container fluid>
                                    {
                                        pessoas.colaboradores.length > 0 ?
                                        pessoas.colaboradores.map((colaborador, index) => {
                                            return <Pessoa id={colaborador.id} idUI={colaborador.idUsuarioInstituicao} nome={colaborador.nome} meuId={meuId} adm={adm} idInstituicao={idInstituicao} listar={listar} key={index}/>
                                        })
                                        :
                                        <p>Essa instituição ainda não tem nenhum colaborador!</p>
                                    }
                                </Container>
                            </ListGroup>
                        </div>
                    :
                    <div style={{width: "83vw", display: "flex", justifyContent: "center"}}>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                }
            </Container>
        </>
    )
}

export default PessoasDaInstituicao;