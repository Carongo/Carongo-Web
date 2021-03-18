import React, {useState, useEffect} from 'react';
import{ Container, Card, Form, InputGroup, FormControl, FormFile, Spinner, Button, Modal } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import {useFormik} from "formik";
import {useToasts} from "react-toast-notifications";
import * as Yup from "yup";

const Perfil = ({idPerfil, nomePerfil, email, senha, listar, buscar, url, tipo}) => {
    const deletarPerfil = async (id) => {
        const response = await fetch(`${url}/aluno/deletar-perfil`, {
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
    
    const {addToast} = useToasts();
    const [showModalAlterarPerfil, setShowModalAlterarPerfil] = useState(false);
    const [perfil, setPerfil] = useState({});
    const handleCloseModalAlterarPerfil = () => setShowModalAlterarPerfil(false);
    const [idPerfilAlterar, setIdPerfilAlterar] = useState("");
    const handleShowModalAlterarPerfil = (id) => {
        setIdPerfilAlterar(id);
        buscar(id);
        setShowModalAlterarPerfil(true);
    };

const ModalAlterarPerfil = () => {
    

    const formikAlterarPerfil = useFormik({
        initialValues : {
            Nome : perfil.nome,
            Email : perfil.email,
            Senha: perfil.senha
        },
        onSubmit : values => {
            fetch(`${url}/perfil/alterar-perfil`, {
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

                    formikAlterarPerfil.resetForm();

                    listar();
                } 
                else {
                    addToast(dados.mensagem, {
                        appearance : 'error',
                        autoDismiss : true
                    })
                }
                setShowModalAlterarPerfil(false);
            })
        },
        validationSchema : Yup.object().shape({
            Nome: Yup.string()         
              .min(2, 'O nome deve ter no minimo 3 caracteres')
              .max(41, 'O nome deve ter no máximo 40 caracteres')
              .required('Informe um nome'),
            Email: Yup.string()
              .required('Informe um email'),
            Senha: Yup.string()
              .required('Informe uma senha'),
        })
    })

    

    return (
        <Modal show={showModalAlterarPerfil} onHide={handleCloseModalAlterarPerfil}>
            <Modal.Header closeButton>
                <Modal.Title>Alterar perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Form onSubmit={formikAlterarPerfil.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="Nome" 
                                    placeholder="Nome"  
                                    value={formikAlterarPerfil.values.Nome} 
                                    onChange={formikAlterarPerfil.handleChange}
                                    required />
                                    {formikAlterarPerfil.errors.Nome && formikAlterarPerfil.touched.Nome ? (<div className="error">{formikAlterarPerfil.errors.Nome}</div>) : null }
                            </Form.Group>
                                                        
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="text"  
                                    name="Email"
                                    placeholder="Email" 
                                    value={formikAlterarPerfil.values.Email} 
                                    onChange={formikAlterarPerfil.handleChange}  
                                    required />
                                {formikAlterarPerfil.errors.Email && formikAlterarPerfil.touched.Email ? (<div className="error">{formikAlterarPerfil.errors.Email}</div>) : null }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Senha</Form.Label>
                                <Form.Control 
                                    type="password"  
                                    name="DataNascimento"
                                    placeholder="Data de nascimento" 
                                    value={formikAlterarPerfil.values.Senha} 
                                    onChange={formikAlterarPerfil.handleChange}  
                                    required />
                                {formikAlterarPerfil.errors.Senha && formikAlterarPerfil.touched.Senha ? (<div className="error">{formikAlterarPerfil.errors.Senha}</div>) : null }
                            </Form.Group>
                            
                        </Form>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleCloseModalAlterarPerfil}>
                    Cancelar
                </Button>
                <Button type="submit" onClick={formikAlterarPerfil.handleSubmit} variant="dark" disabled={formikAlterarPerfil.isSubmitting}>{formikAlterarPerfil.isSubmitting ? <Spinner animation="border" size="sm" /> : null } Salvar</Button>
            </Modal.Footer>
        </Modal>
    )
}

return (
    <Card style={{ width: '14rem', margin: "auto" }}>
        <Card.Body>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Card.Title>{nomePerfil}</Card.Title>
                {
                    tipo === 1 ?
                    <div>
                        <ModalAlterarPerfil/>
                        <i className="fas fa-pencil-alt" style={{color: "#0069D9", cursor: "pointer"}} onClick={() => handleShowModalAlterarPerfil(idPerfil)}></i> 
                        <Button style={{color: "red", cursor: "pointer"}} onClick={() => deletarPerfil(idPerfil)}>Deletar Conta</Button>
                    </div>
                    :
                    null
                }
            </div>
            <hr></hr>
            <Card.Text>{email}</Card.Text>
            <Card.Text>{senha}</Card.Text>
        </Card.Body>
    </Card>
)
}

export default Perfil;