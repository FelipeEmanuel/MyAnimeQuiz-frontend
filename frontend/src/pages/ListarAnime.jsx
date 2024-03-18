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
  const [tags, setTags] = useState(["Ação", "Aventura", "Fantasia", "Sci-Fi", "Mitologia", "Shounen"]);

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
  };

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
            <label>Nome</label>
            <input
              type="size-input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required={true}
            />
          </div>
          <button>Submit</button>
        </form>
      </ModalPopup>
    </>
  );
}

export default ListarAnime;
