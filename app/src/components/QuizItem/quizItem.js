import React from 'react';
import './style.css';
import iconHeart from '../../assets/icons/IconHeart.svg';
import iconHeartSelecionado from '../../assets/icons/IconHeart-selecionado.svg';
import { Link } from 'react-router-dom';

function QuizItem({ title, description, tags, id, favorite }) {
  const [isFavorite, setIsFavorite] = React.useState(favorite);
  // const [iconFavorite, setIconFavorite] = React.useState();

  function SalvarFavorito(id) {
    if (localStorage.favoritos) {
      let listaJson = JSON.parse(localStorage.favoritos);

      if (listaJson.includes(id)) {
        const pos = listaJson.indexOf(id);
        listaJson.splice(pos, 1);
        localStorage.favoritos = JSON.stringify(listaJson);
        setIsFavorite(false);
        return;
      }
      listaJson = [id, ...listaJson];
      localStorage.favoritos = JSON.stringify(listaJson);
      setIsFavorite(true);
    } else {
      const listaFavoritos = [id];
      localStorage.favoritos = JSON.stringify(listaFavoritos);
      setIsFavorite(true);
    }
  }

  return (
    <div className="container-quizItem">
      <div
        className="favorited"
        onClick={(e) => SalvarFavorito(e.currentTarget.dataset.id)}
        data-id={id}
      >
        <img
          src={isFavorite ? iconHeartSelecionado : iconHeart}
          alt={isFavorite ? 'Adicionar aos Favoritos' : 'Remover do Favoritos'}
        />
      </div>
      <Link to={'/quiz/' + id} className="content-quizItem">
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
      <Link to={'/quiz/' + id} className="buttonBlock">
        <button className="btn">Responder</button>
      </Link>
    </div>
  );
}

export default QuizItem;
