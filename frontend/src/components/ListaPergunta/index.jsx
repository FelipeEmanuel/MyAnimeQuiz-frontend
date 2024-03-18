import "./listaPergunta.css";

function ListaPergunta({ pergunta }) {
  return (
    <>
      <div className="perguntas">
        <h1>{pergunta.anime.name}</h1>
        <h2>Pergunta: {pergunta.descricao}</h2>
        <div className="opcoes">
          <div className="coisas">
            <b>Resposta(s) Correta(s):</b>
            {pergunta?.respostacerta?.map((respostacertas, i) => (
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
            {pergunta?.tags?.map((tag, i) => (
              <span className="tags" key={i}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaPergunta;
