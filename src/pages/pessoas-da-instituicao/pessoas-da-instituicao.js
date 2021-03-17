import React, {useState, useEffect} from "react";
import {Container, ListGroup, Card, Spinner} from "react-bootstrap";
import { useParams } from "react-router";
import {url} from "../../utils/constants";

const Pessoa = (id, nome) => {
    return (
        <ListGroup.Item>{nome}</ListGroup.Item>
    )
}

const PessoasDaInstituicao = () => {
    const {idInstituicao} = useParams();
    const [pessoas, setPessoas] = useState([]);

    const listar = async () => {
        const response = await fetch(`${url}/instituicao/listar-pessoas-da-instituicao/${idInstituicao}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
            }
        });
        const data = await response.json();

        setPessoas(data.dados);
    }

    useEffect(() => {
        listar();
    }, [])

    return (
        <>
            <Container style={{width: "90%"}}>
                {
                    pessoas.colaboradores !== undefined && pessoas.administradores !== undefined?
                        <div>
                            <h1>Administradores</h1>
                            <ListGroup variant="flush">
                                <Card>
                                    <Card.Body>
                                        <Container fluid>
                                            {
                                                pessoas.colaboradores.map((administrador, index) => {
                                                    return <Pessoa id={administrador.id} nome={administrador.nome} key={index}/>
                                                })
                                            }
                                        </Container>
                                    </Card.Body>
                                </Card>
                            </ListGroup>
                            <h1>Colaboradores</h1>
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