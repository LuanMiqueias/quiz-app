import React from "react";
import "./style.css";
import Header from "../../components/Header/header";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../pages/GlobalStorage";

function Landing() {
  const { auth, dados } = React.useContext(GlobalContext);

  return (
    <div className="container landing">
      <Header style={{ boxShadow: "none" }}>
        <div className="container-menu">
          {dados && auth ? (
            <Link
              to="/dashboard"
              className="btn-account"
              style={{ background: "#432D4E" }}
            >
              {dados.nome}
            </Link>
          ) : (
            <Modal type="login" className="btn-login">
              Login {">"}
            </Modal>
          )}
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
