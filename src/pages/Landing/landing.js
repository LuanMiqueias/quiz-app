import React from 'react'
import './style.css';
import Header from '../../components/Header/header';
import {Link} from 'react-router-dom'

function Landing() {
    return (
        <div className="container">
          <Header>
            <div className="container-link">
              <Link to="/">Login {'>'}</Link>
            </div>
          </Header>
          <main>
            <div className="content">
              <section className="landing">
                <h1 className="title">
                  <span className="span-title">
                    Responda ou Crie
                  </span>
                  Questionarios!
                </h1>
                <div className="buttons">
                  <Link to="all" className="btn btn-responder">Responder</Link>
                  <button className="btn btn-criar" disabled>Criar</button>
                </div>
                <p className="msgUpdate">Em breve novas atualizações!</p>
              </section>
            </div>
          </main>
          <footer>
            <div className="content">
              <button className="btn btn-comoFunciona">Como Funciona?</button>
              <p>Desenvolvido por <a href="https://luanmiqueias.com.br">Luan Miqueias</a></p>
            </div>
          </footer>
        </div>
    )
}

export default Landing
