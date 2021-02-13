import React from "react";
import "./style.css";

import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../pages/GlobalStorage";
import Loading from "../../components/Loading/loading";
import Header from "../../components/Header/header";
import Modal from "../../components/Modal/Modal";
import MyQuiz from "../../components/Dashboard/MyQuiz";
import MyHistory from "../../components/Dashboard/MyHistory";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = React.useContext(GlobalContext);
  const [erroFetch, setErroFetch] = React.useState(null);

  const [dadosUser, setDadosUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useMemo(() => {
    const token = localStorage.token;
    (async () => {
      try {
        const responce = await fetch(
          "https://quizluan.herokuapp.com/dashboard",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );
        if (!responce.ok) {
          setErroFetch("error: " + responce.status);
          return setDadosUser(null);
        }
        const dados = await responce.json();
        if (dados) {
          setLoading(false);
          return setDadosUser(dados);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  function handleLogout(e) {
    e.preventDefault();
    logout(e);
    navigate("/");
  }
  if (!dadosUser) {
    if (erroFetch) {
      return <p>{erroFetch}</p>;
    }
    return (
      <div className="center-loading">
        <Loading />
      </div>
    );
  }
  if (loading) {
    return (
      <div className="center-loading">
        <Loading />
      </div>
    );
  }
  return (
    <div className="container dashboard">
      <Header>
        <div className="container-menu">
          {/* <FormSearch /> */}
          <div className="container-buttons">
            <Link to="/all" className="btn btn-responder-dashboard">
              Responder
            </Link>
            <Modal type="criar">
              <button className="btn btn-criar-dashboard">Criar um Quiz</button>
            </Modal>
          </div>
          <div className="container-dadosUser">
            <Link
              to="/dashboard"
              className="btn-account"
              style={{ background: "#432D4E" }}
            >
              {dadosUser.user.nome}
            </Link>
            <Link to="/" id="btn-logout" onClick={(e) => handleLogout(e)}>
              Sair
            </Link>
          </div>
        </div>
      </Header>
      <main>
        <div className="content">
          <div className="meusQuizzes">
            <h1>Meus Quizzes</h1>
            {Object.keys(dadosUser.quizzes).length < 1 ? (
              <p>Você ainda não criou nenhum quiz</p>
            ) : (
              ""
            )}
            {dadosUser.quizzes.map((quiz) => {
              return (
                <MyQuiz title={quiz.titulo} key={quiz._id} id={quiz._id} />
              );
            })}
          </div>
          <div className="meuHistorico">
            <h1>Historico</h1>
            {Object.keys(dadosUser.historico).length < 1 ? (
              <p>Sem historicos</p>
            ) : (
              ""
            )}
            {dadosUser.historico.map(
              ({ titulo, _id, total, acertos, quiz }) => {
                const acertosPorcentagem = (100 / total) * acertos;
                return (
                  <MyHistory
                    title={titulo}
                    acertou={acertosPorcentagem}
                    id={_id}
                    key={_id}
                    quiz_id={quiz}
                  />
                );
              }
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
export default Dashboard;
