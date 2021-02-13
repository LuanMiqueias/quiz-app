import React from "react";
import "./style.css";

// import { Link } from 'react-router-dom';
import Header from "../../components/Header/header";

// import IconUser from '../../assets/icons/IconUser.svg';
import QuizItem from "../../components/QuizItem/quizItem";
import Loading from "../../components/Loading/loading";
import Modal from "../../components/Modal/Modal";
import { GlobalContext } from "../../pages/GlobalStorage";
import { Link, useNavigate } from "react-router-dom";

function QuizList() {
  const [perguntas, setPerguntas] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  const { dados, auth, logout } = React.useContext(GlobalContext);

  React.useMemo(() => {
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
        <div className="container-menu">
          {/* <FormSearch /> */}
          <div className="container-buttons">
            <Link to="/all" className="btn btn-responder-dashboard">
              Responder
            </Link>
            {dados ? (
              <Modal type="criar">
                <button className="btn btn-criar-dashboard">
                  Criar um Quiz
                </button>
              </Modal>
            ) : (
              <Modal type="login">
                <button className="btn btn-criar-dashboard">
                  Criar um Quiz
                </button>
              </Modal>
            )}
          </div>
          <div className="container-dadosUser">
            {dados && auth ? (
              <Link
                to="/dashboard"
                className="btn-account"
                style={{ background: "#432D4E" }}
              >
                {dados.nome}
              </Link>
            ) : (
              ""
            )}

            {dados && auth ? (
              <Link
                to="/"
                id="btn-logout"
                onClick={(e) => {
                  logout(e);
                  navigate("/");
                }}
              >
                Sair
              </Link>
            ) : (
              <Modal type="login">Login {">"} </Modal>
            )}
          </div>
        </div>
        {/* <div className="container-right">
          {global.login ? (
            global.dadosUser.nome
          ) : (
            <Modal type="login">Login {">"} </Modal>
          )}
        </div> */}
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
