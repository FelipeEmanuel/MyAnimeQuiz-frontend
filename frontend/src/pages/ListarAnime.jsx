import { useEffect, useState } from "react";
import Header from "../components/Header";
import { get } from "../api";
import ListaAnime from "../components/ListaAnime";
import { Link } from "react-router-dom";

function ListarAnime() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    get("api/animes/", setData, setError, setIsFetching);
  }, []);

  /*if(isFetching) {
        return <Spinner/>
      }*/

  // console.log(data)

  return (
    <>
      <Header />

      <div className="div1">
        <Link to="/AddAnime">
          <button className="btn btn-block3">Adicionar novo Anime</button>
        </Link>
      </div>
      {data?.length > 0 && (
        <div>
          {data?.map((anime) => (
            <ListaAnime key={anime._id} anime={anime} />
          ))}
        </div>
      )}
    </>
  );
}

export default ListarAnime;
