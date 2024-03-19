import { useEffect, useState } from "react";
import Header from "../components/Header";
import { get, post } from "../api";
import ListaAnime from "../components/ListaAnime";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ModalPopup from "../components/ModalPopup";

function ListarAnime() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    get("api/animes", setData, setError, setIsFetching);
  }, []);

  if (isFetching) {
    return <Spinner />;
  }

  const criarAnime = async (e) => {
    e.preventDefault();
    alert("Anime criado com sucesso!");
    setButtonPopup(false);

    const body = {
      name,
      tags
    };

    post('api/animes', body, setData);
    setName("")
    setTag("")
    tags.splice(0, tags.length);
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
      <Header />

      <div className="div1">
        <button className="btn btn-block3" onClick={() => setButtonPopup(true)}>
          Adicionar novo Anime
        </button>
      </div>
      {data?.length > 0 && (
        <div>
          {data?.map((anime) => (
            <ListaAnime key={anime._id} anime={anime} />
          ))}
        </div>
      )}

      {
        data?.length === 0 && (
          <h1>Não existem animes cadastrados.</h1>
        )
      }

      <ModalPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form className="formulario" onSubmit={(event) => criarAnime(event)}>
          <div className="animes">
            <label><b>Nome</b></label>
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
          <button className="btn btn-block">Adicionar</button>
        </form>
      </ModalPopup>
    </>
  );
}

export default ListarAnime;
