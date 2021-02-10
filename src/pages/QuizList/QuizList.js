import React from "react";
import "./style.css";

// import { Link } from 'react-router-dom';
import Header from "../../components/Header/header";

// import IconUser from '../../assets/icons/IconUser.svg';
import QuizItem from "../../components/QuizItem/quizItem";
import Loading from "../../components/Loading/loading";
import Modal from "../../components/Modal/Modal";
import { GlobalContext } from "../../pages/GlobalStorage";
import FormSearch from "../../components/Forms/FormSearch/FormSearch";

function QuizList() {
  const [perguntas, setPerguntas] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const global = React.useContext(GlobalContext);

  React.useEffect(() => {
    setLoading(true);
    fetch("https://quizluan.herokuapp.com/all")
      .then((responce) => responce.json())
      .then((json) => {
        const perguntaItem = json.map(({ titulo, descricao, tags, _id }) => {
          let isFavorite = false;
          if (localStorage.favoritos) {
            const arrayFavoritos = JSON.parse(localStorage.favoritos);
            arrayFavoritos.forEach((item) => {
              if (item === _id) {
                isFavorite = true;
              }
            });
          }
          return (
            <QuizItem
              key={_id}
              title={titulo}
              description={descricao}
              tags={tags}
              id={_id}
              favorite={isFavorite}
            />
          );
        });
        setPerguntas(perguntaItem);
        setLoading(false);
      });
  }, []);
  return (
    <div className="quizList">
      <Header>
        <div className="container-right">
          {global.login ? (
            global.dadosUser.nome
          ) : (
            <Modal type="login">Login {">"} </Modal>
          )}
        </div>
      </Header>
      <main>
        <div className="content">
          <h1>Quizzes enviados recentemente </h1>
          <section>{loading ? <Loading /> : perguntas}</section>
        </div>
      </main>
    </div>
  );
}

export default QuizList;
