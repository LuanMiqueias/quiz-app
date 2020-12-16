import React from 'react'
import './style.css'
import iconHeart from '../../assets/icons/IconHeart.svg';
import iconHeartSelecionado from '../../assets/icons/IconHeart-selecionado.svg';

function QuizItem({title, description, tags, favorited}){
    const [isFavorite, SetIsFavorite] = React.useState()
    
    React.useEffect(() => {
        if(favorited){
            SetIsFavorite(() => <div className="favorited"><img src={iconHeartSelecionado}alt="remover dos avorito"/></div>)
        }else{
            SetIsFavorite(() => <div className="favorited"><img src={iconHeart}alt="adicionar aos favorito"/></div>)
        }
    }, [SetIsFavorite, favorited])
    return(
        <div className="container-quizItem">
            {isFavorite}
            <div className="content-quizItem">
                <div>
                <h1>{title}</h1>
                <p>{description}</p>
                </div>
                <div className="container-spanItems">
                    {tags.map((item) => <span key={item} className="tag">{item}</span>)}
                </div>
            </div>
            <div className="buttonBlock">
                <button  className="btn">Responder</button>
            </div>
        </div>
    );
}

export default QuizItem