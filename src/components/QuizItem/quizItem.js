import React from 'react'
import './style.css'
import iconHeart from '../../assets/icons/IconHeart.svg';
import iconHeartCortado from '../../assets/icons/IconHeartCortado.svg';

function QuizItem({title, description, tags, favorited}){
    const [isFavorite, SetIsFavorite] = React.useState()
    
    React.useEffect(() => {
        if(favorited){
            SetIsFavorite(() => <div className="favorited" style={{backgroundColor: "#F55D94"}}><img src={iconHeartCortado}alt="remover dos avorito"/></div>)
        }else{
            SetIsFavorite(() => <div className="favorited" style={{backgroundColor: "#CCC2C4"}}><img src={iconHeart}alt="adicionar aos favorito"/></div>)
        }
    }, [SetIsFavorite, favorited])
    return(
        <div class="container-quizItem">
            {isFavorite}
            <div class="content-quizItem">
                <div>
                <h1>{title}</h1>
                <p>{description}</p>
                </div>
                <div>
                    {tags.map((item) => <span key={item} class="tag">{item}</span>)}
                </div>
            </div>
            <div class="buttonBlock">
                <span class="divisor"></span>
                <button  className="btn">Responder</button>
            </div>
        </div>
    );
}

export default QuizItem