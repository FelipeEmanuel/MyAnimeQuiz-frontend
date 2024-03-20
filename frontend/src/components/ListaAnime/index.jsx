import { Link } from "react-router-dom";
import "./listaAnime.css";
import { put, remove } from "../../api";
import { useState } from "react";
import ModalPopup from "../ModalPopup";
import { AiFillCloseCircle } from "react-icons/ai";

function ListaAnime({ anime, setAnime }) {
  const [name, setName] = useState(anime?.name);
  const [tags, setTags] = useState(anime?.tags);
  const [tag, setTag] = useState("");
  const [statusPopup, setStatusPopup] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [buttonPopup, setButtonPopup] = useState(false);

  const deletarAnime = () => {
    remove(`/api/animes/${anime?._id}`, setAnime, setError, setIsFetching);
  };

  const editAnime = async (event) => {
    event.preventDefault();
    alert("Alterações realizadas com sucesso!");
    setButtonPopup(false);

    const body = {
      name,
      tags,
    };

    try {
      put(`api/animes/${anime?._id}`, body, setData, setError);
    } catch (error) {
      console.error("Erro ao editar o anime", error);
    }
  };

  function addTags() {
    setTags([...tags, tag]);
    setTag("");
  }

  function apagarTag(tag) {
    setTags(tags.filter((t) => t !== tag));
  }

  return (
    <>
      <div className="animes">
        <AiFillCloseCircle
          size={25}
          className="deletar"
          onClick={() => setStatusPopup(true)}
        />
        <h2>{anime.name}</h2>
        <div className="listagem">
          <h3>Tags:</h3>
          {anime?.tags?.map((tag, i) => (
            <span className="demografia" key={i}>
              {tag}
            </span>
          ))}
        </div>
        <div className="div2">
          <div className="botao-anime">
            <Link to={`/${anime._id}`}>
              <button className="btn btn-block">Listar Perguntas</button>
            </Link>
            <button
              className="btn btn-block"
              onClick={() => setButtonPopup(true)}
            >
              Editar anime
            </button>
          </div>
        </div>
      </div>

      <ModalPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form className="formulario" onSubmit={(event) => editAnime(event)}>
          <div className="animes">
            <label>
              <b>Nome</b>
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required={true}
            />
            <label>
              <b>Tags</b>
            </label>
            <div className="form-input-tag">
              <input
                type="text"
                value={tag}
                onChange={(event) => setTag(event.target.value)}
              />
              <button
                className="btn btn-block2"
                type="button"
                onClick={addTags}
              >
                Add
              </button>
            </div>
            <div>
              <div className="lista-tags">
                {tags.map((t) => {
                  return (
                    <div className="lista-tags-div">
                      <span className="lista-tags-inside" key={t}>
                        {t}
                      </span>
                      <span
                        className="lista-tags-x"
                        onClick={() => apagarTag(t)}
                      >
                        <b>x</b>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <button className="btn btn-block">Finalizar edição</button>
        </form>
      </ModalPopup>

      <ModalPopup trigger={statusPopup} setTrigger={setStatusPopup}>
        <h2>Tem certeza que deseja deletar esse anime?</h2>
        <div className="div1">
          <button className="btn btn-block" onClick={deletarAnime}>
            Sim, tenho certeza.
          </button>
        </div>
      </ModalPopup>
    </>
  );
}

export default ListaAnime;
