import { useEffect, useState } from "react";
import Header from "../components/Header";
import { get } from "../api";
import ListaPergunta from "../components/ListaPergunta";
import { Link, useParams } from "react-router-dom";

function ListarPergunta() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    get(`api/perguntas/${id}`, setData, setError, setIsFetching);
  }, []);

  /*if(isFetching) {
        return <Spinner/>
      }*/

  console.log(id)
  
  return (
    <>
      <Header />
      <div className="div1">
      <Link to={"/pergunta"}>
                  <button className="btn btn-block3">Adicionar nova pergunta</button>
        </Link>
      </div>

      {data?.length > 0 && (
        <div>
          {data?.map((pergunta) => (
            <ListaPergunta key={pergunta._id} pergunta={pergunta} />
          ))}
        </div>
      )}
    </>
  );
}

export default ListarPergunta;
