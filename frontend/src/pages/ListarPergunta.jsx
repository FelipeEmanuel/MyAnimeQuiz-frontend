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
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [respostasCertas, setRespostasCertas] = useState([]);
  const [respostaCerta, setRespostaCerta] = useState("");
  const [opcoes, setOpcoes] = useState([]);
  const [opcao, setOpcao] = useState("");
  const [dificuldade, setDificuldade] = useState("");

  useEffect(() => {
    get(`api/perguntas/${id}`, setData, setError, setIsFetching);
  }, [data]);

  const dificuldades = ["Fácil", "Médio", "Difícil"];
  const tipos = ["História", "Trivia", "Filler"];

  if (isFetching) {
    return <Spinner />;
  }

  const criarPergunta = async (e) => {
    e.preventDefault();
    alert("Pergunta criada com sucesso!");
    setButtonPopup(false);

    const body = {
      descricao,
      tipos: tipo,
      respostasCertas,
      opcoes,
      dificuldade,
      anime: id,
    };

    post(`api/perguntas/${id}`, body, setData);
    setDescricao("");
    setRespostaCerta("");
    setTipo("");
    setOpcao("");
    setDificuldade("");
    respostasCertas.splice(0, respostasCertas.length);
    opcoes.splice(0, opcoes.length);
  };

  //RespostaCerta
  function addRespostasCertas() {
    respostasCertas.push(respostaCerta);
    setRespostasCertas(respostasCertas);
    setRespostaCerta("");
    /*setRespostasCertas([...respostasCertas, respostaCerta]);
    setRespostaCerta("");*/
  }

  function apagarRespostaCerta(respostacerta) {
    setRespostasCertas(respostasCertas.filter((r) => r !== respostacerta));
  }

  //Opções(Respostas Erradas)
  function addOpcoes() {
    opcoes.push(opcao);
    setOpcoes(opcoes);
    setOpcao("");
    /*setOpcoes([...opcoes, opcao]);
    setOpcao("");*/
  }

  function apagarOpcao(opcao) {
    setOpcoes(opcoes.filter((op) => op !== opcao));
  }

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
            <ListaPergunta key={pergunta._id} pergunta={pergunta} setPergunta={setData}/>
          ))}
        </div>
      )}

      {data?.length === 0 && <h1>Não existem perguntas para esse anime.</h1>}

      <ModalPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form className="formulario" onSubmit={(event) => criarPergunta(event)}>
          <div className="animes">
            <label>
              <b>Pergunta</b>
            </label>
            <input
              type="text"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              required={true}
            />
            {/*--------------------------Tipos------------------------------*/}
            <label>
              <b>Tipo</b>
            </label>
            <select
              required={true}
              value={tipo}
              onChange={(evento) => setTipo(evento.target.value)}
            >
              <option />
              {tipos?.map((t) => {
                return (
                  <option key={t} value={t}>
                    {t}
                  </option>
                );
              })}
            </select>
            {/*----------------------RespostaCerta----------------------------*/}
            <label>
              <b>Respostas Certas</b>
            </label>
            <div className="form-input-tag">
              <input
                type="text"
                value={respostaCerta}
                onChange={(event) => setRespostaCerta(event.target.value)}
              />
              <button
                className="btn btn-block2"
                type="button"
                onClick={addRespostasCertas}
              >
                Add
              </button>
            </div>
            <div>
              <div className="lista-tags">
                {respostasCertas.map((r) => {
                  return (
                    <div className="lista-tags-div">
                      <span className="lista-tags-inside" key={r}>
                        {r}
                      </span>
                      <span
                        className="lista-tags-x"
                        onClick={() => apagarRespostaCerta(r)}
                      >
                        <b>x</b>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/*---------------------------Opções---------------------------*/}
            <label>
              <b>Opções (Respostas Erradas)</b>
            </label>
            <div className="form-input-tag">
              <input
                type="text"
                value={opcao}
                onChange={(event) => setOpcao(event.target.value)}
              />
              <button
                className="btn btn-block2"
                type="button"
                onClick={addOpcoes}
              >
                Add
              </button>
            </div>
            <div>
              <div className="lista-tags">
                {opcoes.map((op) => {
                  return (
                    <div className="lista-tags-div">
                      <span className="lista-tags-inside" key={op}>
                        {op}
                      </span>
                      <span
                        className="lista-tags-x"
                        onClick={() => apagarOpcao(op)}
                      >
                        <b>x</b>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Dificuldade */}
            <label>
              <b>Dificuldade</b>
            </label>
            <select
              required={true}
              value={dificuldade}
              onChange={(evento) => setDificuldade(evento.target.value)}
            >
              <option />
              {dificuldades?.map((d) => {
                return (
                  <option key={d} value={d}>
                    {d}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="btn btn-block">Adicionar</button>
        </form>
      </ModalPopup>
    </>
  );
}

export default ListarPergunta;
