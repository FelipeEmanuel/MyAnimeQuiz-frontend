import { useState } from "react";
import "./addPerguntas.css";
import { post } from "../../api";

function AddPerguntas() {
  const [nome, setNome] = useState("");
  const [tag, setTag] = useState("");

  let listaDeTags = [];

  function addTag(value) {
    listaDeTags.push(value);
    setTag("");
    console.log(listaDeTags);
  }

  const adicionarPergunta = (e) => {
    e.preventDefault();

    const body = {
      nome: nome,
      tags: tag,
    };

    post(`api/perguntas/pergunta/`, body);
  };

  return (
    <>
      <form onSubmit={adicionarPergunta}>
        <div className="animes">
          <label>Nome do Anime:</label>
          <input
            type="size input"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required="true"
          />
          {/*<div className="animes">
            <label>Tags do Anime:</label>

            <input
              type="size input"
              value={tag}
              onChange={(event) => setTag(event.target.value)}
              required="true"
            />

            <button onClick={addTag(tag)}>Adicionar Tag</button>
          </div>
          */}
          <button>Submit</button>
        </div>
      </form>
    </>
  );
}

export default AddPerguntas;
