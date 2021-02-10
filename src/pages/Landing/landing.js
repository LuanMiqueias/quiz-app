import React from "react";
import "./style.css";
import Header from "../../components/Header/header";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../pages/GlobalStorage";
// import Loading from "../../components/Loading/loading";

function Landing() {
  // const [user, setUser] = React.useState(null);
  const { auth } = React.useContext(GlobalContext);
  const [dadosUser, setDadosUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // const [teste, setTeste] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.token;

    (async () => {
      try {
        const responce = await fetch("https://quizluan.herokuapp.com/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
        });
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

  return (
    <div className="container landing">
      <Header>
        <div className="container-link">
          {auth && !loading ? (
            dadosUser.user.nome
          ) : (
            <Modal type="login">Login {">"} </Modal>
          )}
          {/* <Link to="/" id="btn-logout" onClick={(e) => handleLogout(e)}>
            Sair
          </Link>  */}
        </div>
      </Header>
      <main>
        <div className="content">
          <section>
            <h1 className="title">
              <span className="span-title">Responda ou Crie</span>
              Questionarios!
            </h1>
            <div className="buttons">
              <Link to="/all" className="btn btn-responder">
                Responder
              </Link>
              {auth ? (
                <Modal type="criar">
                  <button className="btn btn-criar">Criar</button>
                </Modal>
              ) : (
                <Modal type="login">
                  <button className="btn btn-criar">Criar</button>
                </Modal>
              )}
            </div>
            <p className="msgUpdate">Em breve novas atualizações!</p>
          </section>
        </div>
      </main>
      <footer>
        <div className="content">
          {/* <button className="btn btn-comoFunciona">Como Funciona?</button> */}

          <p>
            Desenvolvido por{" "}
            <a href="https://luanmiqueias.com.br">Luan Miqueias</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
