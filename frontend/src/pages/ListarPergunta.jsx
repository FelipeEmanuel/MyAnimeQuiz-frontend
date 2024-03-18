import { useEffect, useState } from "react";
import Header from "../components/Header";
import { get, post } from "../api";
import ListaPergunta from "../components/ListaPergunta";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ModalPopup from "../components/ModalPopup";

function ListarPergunta() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [anime, setAnime] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tags, setTags] = useState(["História"]);
  const [respostacerta, setRespostaCerta] = useState(["Billions"]);
  const [opcoes, setOpcoes] = useState([
    "Millions",
    "Unluckies",
    "Crackers",
    "Berries",
    "Moneys",
    "Dollars",
    "Cashies",
    "Covens",
  ]);
  const [dificuldade, setDificuldade] = "Fácil";

  useEffect(() => {
    get(`api/perguntas/${id}`, setData, setError, setIsFetching);
    if (data) {
      setAnime(data[0]?.anime._id);
    }
  }, []);

  if (isFetching) {
    return <Spinner />;
  }

  const criarPergunta = async (e) => {
    e.preventDefault();
    alert("Pergunta criada com sucesso!");
    setButtonPopup(false);

    const body = {
      descricao,
      tags,
      respostacerta,
      opcoes,
      dificuldade,
      anime: id,
    };

    post(`api/perguntas/${id}`, body, setData);
  };

  return (
    <>
      <Header />
      <div className="div1">
        <button className="btn btn-block3" onClick={() => setButtonPopup(true)}>
          Adicionar pergunta
        </button>
      </div>

      {data?.length > 0 && (
        <div>
          {data?.map((pergunta) => (
            <ListaPergunta key={pergunta._id} pergunta={pergunta} />
          ))}
        </div>
      )}

      {
        data?.length === 0 && (
          <h1>Não existem perguntas para esse anime.</h1>
        )
      }

      <ModalPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form className="formulario" onSubmit={(event) => criarPergunta(event)}>
          <div className="animes">
            <label>Pergunta</label>
            <input
              type="size-input"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              required={true}
            />
          </div>
          <button>Submit</button>
        </form>
      </ModalPopup>
    </>
  );
}

export default ListarPergunta;
