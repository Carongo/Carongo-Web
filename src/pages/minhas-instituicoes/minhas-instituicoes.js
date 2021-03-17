import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import{ Container, Card, Dropdown, Col, Form, InputGroup, FormControl, FormFile, Spinner, Button, Modal } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {url} from "../../utils/constants";
import {useFormik} from "formik";
import {useToasts} from "react-toast-notifications";
import firebase from "firebase";
import {useHistory} from "react-router-dom";
import * as Yup from "yup";
import "./index.css";
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';

var firebaseConfig = {
    apiKey: "AIzaSyDP-Kaj-XntRALyVe4hslPw_a6uoPzTsCo",
    authDomain: "carongo-api.firebaseapp.com",
    projectId: "carongo-api",
    storageBucket: "carongo-api.appspot.com",
    messagingSenderId: "316864397132",
    appId: "1:316864397132:web:ff1b376c1b87b421ead9e9",
    measurementId: "G-XPSC8L642V"
  };

const app = firebase.initializeApp(firebaseConfig);
const storage = app.storage();

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1025
        },
        items: 3.3
    },
    laptop: {
        breakpoint: {
            max: 1024,
            min: 769
        },
        items: 2.5
    },
    tabletS: {
        breakpoint: {
            max: 500,
            min: 426
        },
        items: 1.4
    },
    tabletM: {
        breakpoint: {
            max: 650,
            min: 501
        },
        items: 1.75
    },
    tabletL: {
        breakpoint: {
            max: 768,
            min: 651
        },
        items: 2
    },
    mobileS: {
        breakpoint: {
            max: 320,
            min: 0
        },
        items: 1
    },
    mobileM: {
        breakpoint: {
            max: 375,
            min: 321
        },
        items: 1
    },
    mobileL: {
        breakpoint: {
            max: 425,
            min: 376
        },
        items: 1.25
    }
}

const Instituicao = ({idInstituicao, nomeInstituicao, descricao, codigo, listar}) => {
    const {addToast} = useToasts();
    const [showModalAlterarInstituicao, setShowModalAlterarInstituicao] = useState(false);
    const [intituicao, setInstituicao] = useState({});
    const handleCloseModalAlterarInstituicao = () => setShowModalAlterarInstituicao(false);
    const [idInstituicaoAlterar, setIdInstituicaoAlterar] = useState("");
    const handleShowModalAlterarInstituicao = (id) => {
        setIdInstituicaoAlterar(id);
        buscar(id)
        setShowModalAlterarInstituicao(true);
    };

    const buscar = (id) => {
        fetch(`${url}/instituicao/listar-detalhes-da-instituicao/${id}`, {
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
            }
        })
        .then(resultado => resultado.json())
        .then(dados => {
            setInstituicao(dados.dados);
        })
    } 

    const ModalAlterarInstituicao = () => {
        const uploadImgInstituicao = (event) => {
            event.preventDefault();
    
            let image = event.target.files[0];
    
            let nomeImg = criarGuid();
    
            storage.ref(nomeImg).put(image).then(async () => {
                let a = await storage.ref(nomeImg).getDownloadURL();
                formikAlterarAluno.setFieldValue("urlFoto", a);
            });
        }

        const formikAlterarInstituicao = useFormik({
            initialValues : {
                Nome : instituicao.nome,
                Descricao : instituicao.descricao,
                Codigo: instituicao.codigo,
                idInstituicao: idInstituicaoAlterar
            },
            onSubmit : values => {
                fetch(`${url}/instituicao/alterar-instituicao`, {
                    method: "PUT",
                    body: JSON.stringify(values),
                    headers: {
                        "content-type": "application/json",
                        "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
                    }
                })
                .then(resultado => resultado.json())
                .then(dados => {
                    console.log(dados)
                    if(dados.sucesso){
                        addToast(dados.mensagem, {
                            appearance : 'success',
                            autoDismiss : true
                        });
    
                        formikAlterarInstituicao.resetForm();
    
                        listar();
                    } 
                    else {
                        addToast(dados.mensagem, {
                            appearance : 'error',
                            autoDismiss : true
                        })
                    }
                    setShowModalAlterarInstituicao(false);
                })
            },
            validationSchema : Yup.object().shape({
                Nome: Yup.string()         
                  .min(2, 'O nome da instituicao deve ter no minimo 3 caracteres')
                  .max(41, 'O nome da instituicao deve ter no máximo 40 caracteres')
                  .required('Informe um nome'),
                Descricao: Yup.string()
                  .min(3, 'A descricao deve ter no minimo 3 caracteres')
                  .max(512, 'A descricao deve ter no máximo 512 caracteres')                  .required('Informe um email'),
                Codigo: Yup.string()
                  .required('Informe o codigo da instituicao'),
            })
        })

        return (
            <Modal show={showModalAlterarInstituicao} onHide={handleCloseModalAlterarInstituicao}>
                <Modal.Header closeButton>
                    <Modal.Title>Alterar instituicao</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            {formikAlterarInstituicao.values.urlFoto &&<div style={{width: "150px", height: "150px", backgroundImage: `url(${formikAlterarInstituicao.values.urlFoto})`, margin: "auto", boxShadow: "inset 2px 2px 5px black, 2px 2px 2px black", backgroundSize: "cover", backgroundPosition: "50% 50%"}}></div>}
                            <Form style={{margin: "20px", display: "flex", justifyContent: "center"}}>
                                <FormFile>
                                    <Form.Label htmlFor="Instituicao"><p style={{color: "#0069D9", cursor: "pointer"}}><i className="far fa-image"></i>{ formikAlterarInstituicao.values.urlFoto === "" ? " Selecionar imagem": " Trocar imagem"}</p></Form.Label>
                                    <Form.File
                                        id="Instituicao"
                                        label="Imagem da instituicao"
                                        custom
                                        accept="image/*"
                                        style={{display: "none"}}
                                        onChange={event => uploadImgInstituicao(event)}
                                    />
                                </FormFile>
                            </Form>
                            <Form onSubmit={formikAlterarInstituicao.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="Nome" 
                                        placeholder="Nome"  
                                        value={formikAlterarInstituicao.values.Nome} 
                                        onChange={formikAlterarInstituicao.handleChange}
                                        required />
                                        {formikAlterarInstituicao.errors.Nome && formikAlterarInstituicao.touched.Nome ? (<div className="error">{formikAlterarInstituicao.errors.Nome}</div>) : null }
                                </Form.Group>
                                                            
                                <Form.Group>
                                    <Form.Label>Descricao</Form.Label>
                                    <Form.Control 
                                        type="text"  
                                        name="Descricao"
                                        placeholder="Descricao" 
                                        value={formikAlterarInstituicao.values.Descricao} 
                                        onChange={formikAlterarInstituicao.handleChange}  
                                        required />
                                    {formikAlterarInstituicao.errors.Descricao && formikAlterarInstituicao.touched.Descricao ? (<div className="error">{formikAlterarInstituicao.errors.Descricao}</div>) : null }
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Codigo</Form.Label>
                                    <Form.Control 
                                        type="text"  
                                        name="Codigo"
                                        placeholder="Codigo" 
                                        value={formikAlterarInstituicao.values.Codigo} 
                                        onChange={formikAlterarInstituicao.handleChange}  
                                        required />
                                    {formikAlterarInstituicao.errors.Codigo && formikAlterarInstituicao.touched.Codigo ? (<div className="error">{formikAlterarInstituicao.errors.Codigo}</div>) : null }
                                </Form.Group>
                              
                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleCloseModalAlterarInstituicao}>
                        Cancelar
                    </Button>
                    <Button type="submit" onClick={formikAlterarInstituicao.handleSubmit} variant="dark" disabled={formikAlterarInstituicao.isSubmitting}>{formikAlterarInstituicao.isSubmitting ? <Spinner animation="border" size="sm" /> : null } Salvar</Button>
                </Modal.Footer>
            </Modal>
        )
    }

const MinhasInstituicoes = () => {
    const {idInstituicao} = useParams();
    const history = useHistory();
    const {addToast} = useToasts();


    const listar = async () => {
        const response = await fetch(`${url}/instituicao/listar-minhas-instituicoes/`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
            }
        });
        const data = await response.json();

        if(data.dados != undefined)
            setInstituicao(data.dados);
        else 
            addToast(data.mensagem, {appearance: "error", autoDismiss: true});
    }

    const formikFiltroPorNome = useFormik({
        initialValues: {
            nome: ""
        },
        onSubmit: (values) => {
            fetch(`${url}/instituicao/listar-minhas-instituicoes/${values.nome}`, {
                headers: {
                    "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data.dados != undefined)
                    setInstituicaos(data.dados);
                else 
                    addToast(data.mensagem, {appearance: "error", autoDismiss: true});
            });
        }
    })

    return (
        <>
            <Container style={{width: "95vw"}}>
            <div style={{textAlign: "right"}}>
            </div>
                <Form style={{marginTop: "50px"}}> 
                    <Form.Row className="align-items-center justify-content-center">
                        <Col xs="auto">
                            <InputGroup className="mb-2">
                                <FormControl id="inlineFormInputGroup" name="nome" placeholder="Pesquisar por nome..." value={formikFiltroPorNome.values.nome} onChange={formikFiltroPorNome.handleChange}/>
                                <InputGroup.Prepend>
                                    <InputGroup.Text style={{cursor: "pointer"}} onClick={formikFiltroPorNome.handleSubmit}>
                                        <i className="fas fa-search"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Col>
                    </Form.Row>
                </Form>
                {
                    instituicao.instituicao !== undefined && instituicao.instituicao.length > 1 && urlImagemFiltro != ""?
                    <div style={{width: "83vw", display: "flex", justifyContent: "center"}}>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>:
                    instituicao.instituicao !== undefined
                    ?
                    instituicao.instituicao.map((instituicao, index) => {
                        return <Instituicao idInstituicao={instituicao.idInstituicao} nomeInstituicao={instituicao.nomeInstituicao} descricao={instituicao.descricao} codigo={instituicao.codigo} listar={listar} key={index}/>
                    })
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

const criarGuid = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export default MinhasInstituicoes;