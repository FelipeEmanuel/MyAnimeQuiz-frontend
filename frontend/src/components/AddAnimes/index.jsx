import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { post } from "../../api";
import "./addAnimes.css";

function AddAnimes() {
  const [nome, setNome] = useState("");
  const [tag, setTag] = useState("");

  let listaDeTags = [];

  function addTag(value) {
    listaDeTags.push(value);
    setTag("");
    console.log(listaDeTags);
  }

  const adicionarAnime = (e) => {
    e.preventDefault();

    const body = {
      nome: nome,
      tags: tag,
    };

    post("api/animes", body);
  };

  return (
    <>
      <form onSubmit={adicionarAnime}>
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

export default AddAnimes;
