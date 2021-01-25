import React from "react";
import "./style.css";
import Header from "../../components/Header/header";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../pages/GlobalStorage";
import Loading from "../../components/Loading/loading";

function Landing() {
  const [user, setUser] = React.useState(null);
  const { auth } = React.useContext(GlobalContext);
  const [teste, setTeste] = React.useState(false);

  // React.useEffect(() => {
  //   if (global.login) {
  //     setTeste((prev) => !prev);
  //   }
  // }, [setTeste]);

  // React.useEffect(() => {
  //   if (global.loading) {
  //     return <Loading />;
  //   } else if (global.login) {
  //     setUser(
  //       <>
  //         {global.dadosUser.nome}
  //         <a href="/" id="btn-logout" onClick={(e) => global.logout(e)}>
  //           Sair
  //         </a>
  //       </>
  //     );
  //     console.log(global.dadosUser);
  //     return;
  //   } else if (!global.login) {
  //     console.log(global.login);
  //     setUser(<Modal type="login">Login {">"} </Modal>);
  //     return;
  //   }
  // }, [setUser, global]);

  return (
    <div className="container landing">
      <Header>
        <div className="container-link">
          <Modal type="login">Login {">"} </Modal>
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
