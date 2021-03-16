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

const Aluno = ({idAluno, nomeAluno, email, dataNascimento, urlFoto, cpf, tipo, listar}) => {
    const {addToast} = useToasts();

    const deletarAluno = async (id) => {
        const response = await fetch(`${url}/aluno/deletar-aluno`, {
            method: "DELETE",
            body: JSON.stringify({
                idAluno : id
            }),
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
            }
        });
        const data = await response.json();
        addToast(data.mensagem, {appearance: "success", autoDismiss: true});
        listar();
    }

    return (
        <Card style={{ width: '14rem', margin: "auto" }}>
            <Card.Img variant="top" src={urlFoto} />
            <Card.Body>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Card.Title>{nomeAluno}</Card.Title>
                    {
                        tipo === 1 ?
                        <div>
                            <i className="fas fa-pencil-alt" style={{color: "#0069D9", cursor: "pointer"}}></i> <i className="fas fa-trash-alt" style={{color: "red", cursor: "pointer"}} onClick={() => deletarAluno(idAluno)}></i>
                        </div>
                        :
                        null
                    }
                </div>
                <hr></hr>
                <Card.Text>{email}</Card.Text>
                <Card.Text>{dataNascimento}</Card.Text>
                <Card.Text>{cpf}</Card.Text>
            </Card.Body>
        </Card>
    )
}

const Turma = ({idTurma, nomeTurma, alunos, tipo, listar, criarGuid}) => {
    const {addToast} = useToasts();
    const [showModalAluno, setShowModalAluno] = useState(false);
    const handleCloseModalAluno = () => setShowModalAluno(false);
    const [idTurmaAddAluno, setIdTurmaAddLuno] = useState("");
    const handleShowModalAluno = (id) => {
        setShowModalAluno(true);
        setIdTurmaAddLuno(id);
    };

    const deletarTurma = async (id) => {
        let resposta = window.confirm("Tem certeza de que deseja excluir essa turma? Todos os alunos também serão excluídos!")
        if(resposta) {
            const response = await fetch(`${url}/turma/deletar-turma`, {
                method: "DELETE",
                body: JSON.stringify({
                    idTurma : id
                }),
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
                }
            });
            const data = await response.json();
            addToast(data.mensagem, {appearance: "success", autoDismiss: true});
            listar();
        }
    }

    const ModalAluno = () => {
        const uploadImgAluno = (event) => {
            event.preventDefault();
    
            let image = event.target.files[0];
    
            let nomeImg = criarGuid();
    
            storage.ref(nomeImg).put(image).then(async () => {
                let a = await storage.ref(nomeImg).getDownloadURL();
                formikAluno.setFieldValue("urlFoto", a);
            });
        }

        const formikAluno = useFormik({
            initialValues : {
                Nome : '',
                Email : '',
                DataNascimento: '',
                CPF: '',
                urlFoto: "",
                idTurma: idTurmaAddAluno
            },
            onSubmit : values => {
                console.log(values)
                fetch(`${url}/turma/adicionar-aluno`, {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "content-type": "application/json",
                        "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
                    }
                })
                .then(resultado => {
                    if(resultado.sucesso){
                        addToast(resultado.mensagem, {
                            appearance : 'success',
                            autoDismiss : true
                        });
    
                        formikAluno.resetForm();
    
                        listar();
                    } 
                    else {
                        addToast(resultado.mensagem, {
                            appearance : 'error',
                            autoDismiss : true
                        })
                    }
                })
            },
            validationSchema : Yup.object().shape({
                Nome: Yup.string()         
                  .min(2, 'O nome deve ter no minimo 3 caracteres')
                  .max(41, 'O nome deve ter no máximo 40 caracteres')
                  .required('Informe um nome'),
                Email: Yup.string()
                  .required('Informe um email'),
                DataNascimento: Yup.string()
                  .required('Informe a data de nascimento'),
                CPF: Yup.string()
                  .required('Informe o CPF'),
            })
        })

        return (
            <Modal show={showModalAluno} onHide={handleCloseModalAluno}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar aluno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            {formikAluno.values.urlFoto &&<div style={{width: "150px", height: "150px", backgroundImage: `url(${formikAluno.values.urlFoto})`, margin: "auto", boxShadow: "inset 2px 2px 5px black, 2px 2px 2px black", backgroundSize: "cover", backgroundPosition: "50% 50%"}}></div>}
                            <Form style={{margin: "20px", display: "flex", justifyContent: "center"}}>
                                <FormFile>
                                    <Form.Label htmlFor="Aluno"><p style={{color: "#0069D9", cursor: "pointer"}}><i className="far fa-image"></i>{ formikAluno.values.urlFoto === "" ? " Selecionar imagem": " Trocar imagem"}</p></Form.Label>
                                    <Form.File
                                        id="Aluno"
                                        label="Imagem do aluno"
                                        custom
                                        accept="image/*"
                                        style={{display: "none"}}
                                        onChange={event => uploadImgAluno(event)}
                                    />
                                </FormFile>
                            </Form>
                            <Form onSubmit={formikAluno.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="Nome" 
                                        placeholder="Nome"  
                                        value={formikAluno.values.Nome} 
                                        onChange={formikAluno.handleChange}
                                        required />
                                        {formikAluno.errors.Nome && formikAluno.touched.Nome ? (<div className="error">{formikAluno.errors.Nome}</div>) : null }
                                </Form.Group>
                                                            
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="text"  
                                        name="Email"
                                        placeholder="Email" 
                                        value={formikAluno.values.Email} 
                                        onChange={formikAluno.handleChange}  
                                        required />
                                    {formikAluno.errors.Email && formikAluno.touched.Email ? (<div className="error">{formikAluno.errors.Email}</div>) : null }
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Data de Nascimento</Form.Label>
                                    <Form.Control 
                                        type="text"  
                                        name="DataNascimento"
                                        placeholder="Data de nascimento" 
                                        value={formikAluno.values.DataNascimento} 
                                        onChange={formikAluno.handleChange}  
                                        required />
                                    {formikAluno.errors.DataNascimento && formikAluno.touched.DataNascimento ? (<div className="error">{formikAluno.errors.DataNascimento}</div>) : null }
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label>CPF</Form.Label>
                                    <Form.Control 
                                        type="text"  
                                        name="CPF"
                                        placeholder="CPF" 
                                        value={formikAluno.values.CPF} 
                                        onChange={formikAluno.handleChange}  
                                        required />
                                    {formikAluno.errors.CPF && formikAluno.touched.CPF ? (<div className="error">{formikAluno.errors.CPF}</div>) : null }
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleCloseModalAluno}>
                        Cancelar
                    </Button>
                    <Button type="submit" onClick={formikAluno.handleSubmit} variant="dark" disabled={formikAluno.isSubmitting}>{formikAluno.isSubmitting ? <Spinner animation="border" size="sm" /> : null } Salvar</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <div style={{margin: "50px 0"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                <h2 style={{marginRight: "20px"}}>{nomeTurma}</h2>
                {
                    tipo === 1 ?
                    <div>
                        <ModalAluno/>
                        <i className="fas fa-pencil-alt" style={{color: "#0069D9", cursor: "pointer"}}></i> <i className="fas fa-trash-alt" style={{color: "red", cursor: "pointer"}} onClick={() => deletarTurma(idTurma)}></i> <i className="fas fa-plus" style={{color: "green", cursor: "pointer"}} onClick={() => handleShowModalAluno(idTurma)}></i>
                    </div>
                    :
                    null
                }
            </div>
            <Card>
                <Card.Body>
                    {
                        alunos !== undefined && alunos.length > 0 ?
                        <Carousel minimumTouchDrag={0} responsive={responsive} draggable={false} removeArrowOnDeviceType={["mobileL", "mobileS", "mobileLM"]}>
                        {
                            alunos.map((aluno, index) => {
                                return <Aluno idAluno={aluno.idAluno} nomeAluno={aluno.nomeAluno} email={aluno.email} dataNascimento={aluno.dataNascimento} urlFoto={aluno.urlFoto} cpf={aluno.cpf} tipo={tipo} listar={listar} key={index}/>
                            })
                        }
                        </Carousel>
                        :
                        alunos.length === 0 ?
                        <p>Essa turma ainda não tem alunos</p>
                        :
                        null
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

const DetalhesDaInstituicao = () => {
    const {idInstituicao} = useParams();
    const history = useHistory();
    const [turmas, setTurmas] = useState([]);
    const [urlImagemFiltro, setUrlImagemFiltro] = useState("");
    const {addToast} = useToasts();

    useEffect(() => {
        listar();
    }, []);

    useEffect(() => {
        filtrarPorImagem();
    }, [urlImagemFiltro])

    const filtrarPorImagem = async () => {
        const response = await fetch(`${url}/instituicao/listar-detalhes-da-instituicao/${idInstituicao}/urlimagem/${urlImagemFiltro.replaceAll("/", "barra").replaceAll("?", "interrogacao")}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
            }
        });
        const data = await response.json();

        if(data.dados != undefined)
            setTurmas(data.dados);
        else {
            addToast(data.mensagem, {appearance: "error", autoDismiss: true});
            setUrlImagemFiltro("");
        }
    }

    const upload = (event) => {
        event.preventDefault();

        let image = event.target.files[0];

        let nomeImg = criarGuid();

        console.log(image)

        storage.ref(nomeImg).put(image).then(async () => {
            let a = await storage.ref(nomeImg).getDownloadURL();
            setUrlImagemFiltro(a);
            console.log(urlImagemFiltro);
        });
    }

    const sairDaInstituicao = async () => {
        let resposta = window.confirm("Tem certeza de que deseja sair da instituição?");
        if(resposta) {
            const response = await fetch(`${url}/instituicao/sair-da-instituicao`, {
                method: "PUT",
                body: JSON.stringify({
                    idInstituicao: idInstituicao
                }),
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
                }
            });
            const data = response.json();
            if(data.sucesso) {
                addToast(data.mensagem, {appearance: "success", autoDismiss: true});
                history.push("/minhas-instituicoes");
            }
            else{
                addToast(data.mensagem, {appearance: "error", autoDismiss: true});
            }
        }  
    }

    const listar = async () => {
        const response = await fetch(`${url}/instituicao/listar-detalhes-da-instituicao/${idInstituicao}/nome/`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
            }
        });
        const data = await response.json();

        if(data.dados != undefined)
            setTurmas(data.dados);
        else 
            addToast(data.mensagem, {appearance: "error", autoDismiss: true});
    }

    const formikFiltroPorNome = useFormik({
        initialValues: {
            nome: ""
        },
        onSubmit: (values) => {
            fetch(`${url}/instituicao/listar-detalhes-da-instituicao/${idInstituicao}/nome/${values.nome}`, {
                headers: {
                    "authorization": `Bearer ${localStorage.getItem("token-carongo")}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data.dados != undefined)
                    setTurmas(data.dados);
                else 
                    addToast(data.mensagem, {appearance: "error", autoDismiss: true});
            });
        }
    })

    const criarGuid = () => {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    return (
        <>
            <Container style={{width: "95vw"}}>
            <div style={{textAlign: "right"}}>
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <i className="fas fa-ellipsis-v" style={{fontSize: "20px"}}></i><i className="fas fa-ellipsis-v" style={{fontSize: "20px"}}></i><i className="fas fa-ellipsis-v" style={{fontSize: "20px"}}></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            turmas.tipo === 1 ?
                            <>
                                <Dropdown.Header style={{color: "black"}}><i className="fas fa-cog"></i> Configurações da instituição</Dropdown.Header>
                                <Dropdown.Item>Adicionar turma</Dropdown.Item>
                                <Dropdown.Item>Editar instituição</Dropdown.Item>
                                <hr></hr>
                            </>
                            :
                            null
                        }
                        <Dropdown.Header style={{color: "red"}}><i className="fas fa-skull"></i> Área de risco</Dropdown.Header>
                        <Dropdown.Item style={{color: "red"}} onClick={() => sairDaInstituicao()}>Sair da instituição</Dropdown.Item>
                        {
                            turmas.tipo === 1 ?
                            <Dropdown.Item style={{color: "red"}}>Deletar instituição</Dropdown.Item>
                            :
                            null
                        }
                    </Dropdown.Menu>
                </Dropdown>
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
                <p style={{textAlign: "center"}}>Ou...</p>
                <p style={{textAlign: "center"}}>Por reconhecimento facial</p>
                {urlImagemFiltro &&<div style={{width: "150px", height: "150px", backgroundImage: `url(${urlImagemFiltro})`, margin: "auto", boxShadow: "inset 2px 2px 5px black, 2px 2px 2px black", backgroundSize: "cover", backgroundPosition: "50% 50%"}}></div>}
                <Form style={{margin: "20px", display: "flex", justifyContent: "center"}}>
                    <FormFile>
                        <Form.Label htmlFor="fileAluno"><p style={{color: "#0069D9", cursor: "pointer"}}><i className="far fa-image"></i>{ urlImagemFiltro === "" ? " Selecionar imagem": " Trocar imagem"}</p></Form.Label>
                        <Form.File
                            id="fileAluno"
                            label="Imagem do aluno"
                            custom
                            accept="image/*"
                            style={{display: "none"}}
                            onChange={event => upload(event)}
                        />
                    </FormFile>
                </Form>
                {
                    turmas.turmas !== undefined && turmas.turmas.length > 1 && urlImagemFiltro != ""?
                    <div style={{width: "83vw", display: "flex", justifyContent: "center"}}>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>:
                    turmas.turmas !== undefined
                    ?
                    turmas.turmas.map((turma, index) => {
                        return <Turma idTurma={turma.idTurma} nomeTurma={turma.nomeTurma} alunos={turma.alunos} tipo={turmas.tipo} listar={listar} criarGuid={criarGuid} key={index}/>
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

export default DetalhesDaInstituicao;