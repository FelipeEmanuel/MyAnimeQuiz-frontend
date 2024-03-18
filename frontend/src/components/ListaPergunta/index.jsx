import "./listaPergunta.css"

function ListaPergunta({pergunta}){


    console.log(pergunta)

    return (
        <>
        <div className='perguntas'>
        <h2>{pergunta.descricao}</h2>
        <div className='tags'>
            <b>Resposta(s) Correta(s):</b>
            
            {pergunta?.respostacerta?.map((respostacertas, i) => (
                <span className='tags' key={i}>{i+1} - {respostacertas}</span>
                ))}
           <b> Opções Erradas:</b>
            {pergunta?.opcoes?.map((opcoes, i) => (
                <span className='tags' key={i}>{i+1} - {opcoes}</span>
                ))}           
           <b>Tags:</b>
           {pergunta?.tags?.map((tag, i) => (
                <span className='tags' key={i}>{i+1} - {tag}</span>
                ))}
        </div>
        </div>
        </>

    )

}


export default ListaPergunta