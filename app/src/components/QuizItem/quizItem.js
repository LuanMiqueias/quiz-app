import React from "react";
import "./style.css";
import iconHeart from "../../assets/icons/IconHeart.svg";
import iconHeartSelecionado from "../../assets/icons/IconHeart-selecionado.svg";
import { Link } from "react-router-dom";

function QuizItem({ title, description, tags, favorited, id }) {
  const [isFavorite, SetIsFavorite] = React.useState();

  React.useEffect(() => {
    if (favorited) {
      SetIsFavorite(() => (
        <div className="favorited">
          <img src={iconHeartSelecionado} alt="remover dos favoritos" />
        </div>
      ));
    } else {
      SetIsFavorite(() => (
        <div className="favorited">
          <img src={iconHeart} alt="adicionar aos favoritos" />
        </div>
      ));
    }
  }, [SetIsFavorite, favorited]);
  return (
    <div className="container-quizItem">
      {isFavorite}
      <Link to={"quiz/" + id} className="content-quizItem">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="container-spanItems">
          {tags.map((item) => (
            <span key={item} className="tag">
              {item}
            </span>
          ))}
        </div>
      </Link>
      <Link to={"quiz/" + id} className="buttonBlock">
        <button className="btn">Responder</button>
      </Link>
    </div>
  );
}

export default QuizItem;
