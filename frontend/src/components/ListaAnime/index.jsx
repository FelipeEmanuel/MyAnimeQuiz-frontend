import { Link } from "react-router-dom";
import "./listaAnime.css";

function ListaAnime({ anime }) {
  return (
    <>
      <div className="animes">
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
          <Link to={`/${anime._id}`}>
            <button className="btn btn-block">Listar Perguntas</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ListaAnime;
