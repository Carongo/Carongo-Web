//Suponha que seu site tenha 10 páginas com o mesmo rodapé em todos eles. Se um dia você quiser mudar o rodapé do site, você terá que mudar em todas as 10 páginas. Pra isso serve os components, para facilitar.

//Importa React de react.
import React from "react";
//Importa o css específico do index. O Global está em App.css
import "./index.css";

//Importe este componente no App.js.
function Rodape() {
    return (
        <footer className="fundo-azul"> {/*class é uma palavra reservada do js, então usamos className.*/}
            <h1>Senai Informática 132</h1>
        </footer>
    );
}

//Deixa o WebComponent visível para outros WebComponents.
export default Rodape;