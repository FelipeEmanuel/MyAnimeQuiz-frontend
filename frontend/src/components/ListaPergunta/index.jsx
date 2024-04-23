import { AiFillCloseCircle } from "react-icons/ai";
import "./listaPergunta.css";
import { put, remove } from "../../api";
import { useState } from "react";
import ModalPopup from "../ModalPopup";

function ListaPergunta({ pergunta, setPergunta }) {
  const [statusPopup, setStatusPopup] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [descricao, setDescricao] = useState(pergunta?.descricao);
  const [tipo, setTipo] = useState(pergunta?.tipos);
  const [respostasCertas, setRespostasCertas] = useState(pergunta?.respostasCertas);
  const [respostaCerta, setRespostaCerta] = useState("");
  const [opcoes, setOpcoes] = useState(pergunta?.opcoes);
  const [opcao, setOpcao] = useState("");
  const [dificuldade, setDificuldade] = useState(pergunta?.dificuldade);

  const dificuldades = ["Fácil", "Médio", "Difícil"];
  const tipos = ["História", "Trivia", "Filler"];

  const deletarPergunta = () => {
    remove(
      `/api/perguntas/${pergunta?._id}`,
      setPergunta,
      setError,
      setIsFetching
    );
  };

  const editPergunta = async (event) => {
    event.preventDefault();
    alert("Alterações realizadas com sucesso!");
    setButtonPopup(false);

    const body = {
      descricao,
      tipos: tipo,
      respostasCertas,
      opcoes,
      dificuldade,
    };

    try {
      put(`api/perguntas/${pergunta?._id}`, body, setData, setError);
    } catch (error) {
      console.error("Erro ao editar a pergunta", error);
    }
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
      <div className="perguntas">
        <AiFillCloseCircle
          size={25}
          className="deletar"
          onClick={() => setStatusPopup(true)}
        />
        <div className="cabecalho">
          <h1>{pergunta.anime.name}</h1>
          <h2>
            Pergunta: {pergunta.descricao}
          </h2>
        </div>
        <div className="opcoes">
          <div className="coisas">
            <b>Resposta(s) Correta(s):</b>
            {pergunta?.respostasCertas?.map((respostacertas, i) => (
              <span className="certas" key={i}>
                {respostacertas}
              </span>
            ))}
          </div>
          <div className="coisas">
            <b> Opções Erradas:</b>
            {pergunta?.opcoes?.map((opcoes, i) => (
              <span className="erradas" key={i}>
                {opcoes}
              </span>
            ))}
          </div>
          <div className="coisas">
            <b>Tipo:</b>
            <span className="tags">
              {pergunta?.tipos}
            </span>
          </div>
          <div className="coisas">
            <b>Dificuldade:</b>
            <span className="dificuldades">
              {pergunta?.dificuldade}
            </span>
          </div>
          <div className="rodape">
            <div className="botao">
              <button
                className="btn btn-block2"
                onClick={() => setButtonPopup(true)}
              >
                Editar pergunta
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form className="formulario" onSubmit={(event) => editPergunta(event)}>
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
          <button className="btn btn-block">Finalizar edição</button>
        </form>
      </ModalPopup>

      <ModalPopup trigger={statusPopup} setTrigger={setStatusPopup}>
        <h2>Tem certeza que deseja deletar essa pergunta?</h2>
        <div className="div1">
          <button className="btn btn-block" onClick={deletarPergunta}>
            Sim, tenho certeza.
          </button>
        </div>
      </ModalPopup>
    </>
  );
}

export default ListaPergunta;
