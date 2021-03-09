import React, {Component} from "react";

//Para deixar o html mais dinâmico usa-se classes ao invés de functions, que herda de Component.
class Titulo extends Component {
    render() {
        return (
            <div>
                {/*
                    Comentário em JSX: Coloque as chaves para indicar ao JSX que aqui é JS e não HTML, e faça o comentário normalmente.

                    Aqui no h1 pegamos a propriedade titulo do objeto que chamar essa classe. Se não houver, ele coloca a segunda opção.
                    A mesma coisa para o h2.
                */}
                <h1>{this.props.titulo || "Título não informado."}</h1>
                <h2>{this.props.descricao || "Descrição não informada."}</h2>
            </div>
        )
    }
}

export default Titulo;