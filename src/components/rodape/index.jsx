//Suponha que seu site tenha 10 páginas com o mesmo rodapé em todos eles. Se um dia você quiser mudar o rodapé do site, você terá que mudar em todas as 10 páginas. Pra isso serve os components, para facilitar.

//Importa React de react.
import React from "react";
//Importa o css específico do index. O Global está em App.css
import "./index.css";

import logo from '../menu/image/logo02.jpeg'


import {Col, Row, Container} from 'react-bootstrap';

const Rodape =()=>{
    return(
        <div style={{backgroundColor : '#343A40'}}>
            <container className='rodape' >
                <div>
               <a href="/"> <Col sm={8}><img alt="Carongo" src={logo} style={{ width : '175px'}} /></Col></a>
                </div>
            </container>
            <div className='text-center'>
                <h2>Senai de Informatica - 2021</h2>
            </div>
   
    
    
  
    
 
    
     
  
 

       
        </div>
    )
}

export default Rodape;