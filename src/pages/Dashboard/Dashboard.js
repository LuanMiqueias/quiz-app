import React from "react";
import "./style.css";

import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../pages/GlobalStorage";
import Loading from "../../components/Loading/loading";
import Header from "../../components/Header/header";
import Modal from "../../components/Modal/Modal";
import FormSearch from "../../components/Forms/FormSearch/FormSearch";
import MyQuiz from "../../components/Dashboard/MyQuiz";
import MyHistory from "../../components/Dashboard/MyHistory";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = React.useContext(GlobalContext);

  const [dadosUser, setDadosUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [myQuizzes, setMyQuizzes] = React.useState(null);
  React.useEffect(() => {
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
  }, [setDadosUser]);
  console.log(dadosUser);
  function handleLogout(e) {
    e.preventDefault();
    logout(e);
    navigate("/");
  }

  if (loading) {
    return (
      <div className="center-loading">
        <Loading />
      </div>
    );
  }
  if (!dadosUser) {
    return <h1>ERRO</h1>;
  }
  function CreateMyQuizzes() {}
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
            {dadosUser.user.nome}
            {/* <Link to="/" id="btn-logout" onClick={(e) => handleLogout(e)}>
            Sair
          </Link> */}
          </div>
        </div>
      </Header>
      <main>
        <div className="content">
          <div className="meusQuizzes">
            <h1>Meus Quizzes</h1>
            {dadosUser.quizzes.map((quiz) => {
              return <MyQuiz title={quiz.titulo} key={quiz.id} id={quiz._id} />;
            })}
          </div>
          <div className="meuHistorico">
            <h1>Historico</h1>
            {dadosUser.historico.map(({ titulo, _id, total, acertos }) => {
              console.log(_id);
              const acertosPorcentagem = (acertos / 10) * (total * 100);
              return (
                <MyHistory
                  title={titulo}
                  acertou={acertosPorcentagem}
                  id={_id}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
export default Dashboard;
