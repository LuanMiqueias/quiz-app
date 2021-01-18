import React from 'react';
import './style.css';
import Header from '../../components/Header/header';
import Modal from '../../components/Modal/Modal';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../pages/GlobalStorage';
import Loading from '../../components/Loading/loading';

function Landing() {
  const [user, setUser] = React.useState(null);
  const global = React.useContext(GlobalContext);

  React.useEffect(() => {
    let mounted = true;
    if (global.loading) {
      if (mounted) {
        setUser(teste());
      }
    }
    return () => (mounted = false);
  }, [setUser, global]);

  function teste() {
    if (global.loading) {
      return <Loading />;
    } else if (!global.loading && global.login && global.dadosUser) {
      return (
        <>
          {global.dadosUser.nome}
          <a href="/" id="btn-logout" onClick={(e) => global.logout(e)}>
            Sair
          </a>
        </>
      );
    } else {
      return <Modal type="login">Login {'>'} </Modal>;
    }
  }
  return (
    <div className="container landing">
      <Header>
        <div className="container-link">{teste()}</div>
      </Header>
      <main>
        <div className="content">
          <section>
            <h1 className="title">
              <span className="span-title">Responda ou Crie</span>
              Questionarios!
            </h1>
            <div className="buttons">
              <Link to="all" className="btn btn-responder">
                Responder
              </Link>
              <button className="btn btn-criar" disabled>
                Criar
              </button>
            </div>
            <p className="msgUpdate">Em breve novas atualizações!</p>
          </section>
        </div>
      </main>
      <footer>
        <div className="content">
          <button className="btn btn-comoFunciona">Como Funciona?</button>
          <p>
            Desenvolvido por{' '}
            <a href="https://luanmiqueias.com.br">Luan Miqueias</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
