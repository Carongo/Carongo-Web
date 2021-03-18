import React from 'react';
import { Carousel, Container, Row, Col} from 'react-bootstrap';

import Menu from "../../components/menu/index";
import Rodape from "../../components/rodape/index";

import carousel1 from '../../assets/img/Carrousel1.png'
import carousel2 from "../../assets/img/Carrousel2.png";
import eurekinha from "../../assets/img/eurekinha.png";



const Home = () => {
    return (
        <div>
          <Menu/>
          <Carousel fluid>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={carousel1}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={carousel2}
      alt="Second slide"
    />

  </Carousel.Item>

</Carousel>
<div className="container">
  




<Container>
  <Row>
    <Col sm={15}><h1>Quem somos?</h1><p>Fazemos conexões, mas acima de tudo, somos a conexão. Somos o elo entre o que você vê por aí e o que você quer enxergar daqui para frente. A ponte entre a sua rotina e as suas ideias. Unimos a experiência profissional e a formação, a especialização e a vivência. Somos o que você lê para se inspirar, todas as regras e as mudanças. Somos a informação que move você, o mercado e o mundo. O conteúdo que comunica, explica e emociona. Somos completos. E completamos. Somos o que faz o mercado pulsar. A inteligência que traz a inovação do amanhã. Fazemos você e os resultados da sua marca crescerem. Juntos. Somos a paixão que faz você manter o brilho nos olhos a cada novo job. Somos o orgulho de ser, somos uma nação. Mais que um lugar qualquer, somos um mundo. O mundo por trás do marketing. Somos Mundo do Marketing. Você conectado com o mercado.</p></Col>
 


    <Col><img src={eurekinha} style={{display: "block", margin: "auto"}}></img></Col>
  </Row>
  
</Container>


</div>
          <Rodape/>
        </div>
    )
}



export default Home;