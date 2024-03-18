import { Link } from "react-router-dom"
import "./listaAnime.css"

function ListaAnime({anime}){


    console.log(anime)

    return (
        <>
        <div className='animes'>
        <h2>{anime.name}</h2>
        <div className='tags'>
            {anime?.tags?.map((tag, i) => (
                <span className='tags' key={i}>{i+1} - {tag}</span>
                ))}
        <Link to = {`/${anime._id}`}>
        <button>
                Listar Perguntas
        </button>
        </Link>
        
        </div>
        </div>
        </>

    )



}


export default ListaAnime