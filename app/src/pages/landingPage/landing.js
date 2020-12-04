import React from 'react'
import './style.css';

import logo from  '../../img/icons/logo.svg'

function Landing() {
    return (
        <div className="container">
      <header>
        <a href="/"><img src={logo} alt="Logo" title="logo"/></a>
        <div className="container-link">
          <a href="/">Login</a>
        </div>
      </header>
      <main>
        <section className="landing">
          <h1 className="title">
            <span className="span-title">
              Responda ou Crie
            </span>
            Questionarios!
          </h1>
          <div className="buttons">
            <button className="btn btn-responder">Responder</button>
            <button className="btn btn-criar" disabled>Criar</button>
          </div>
          <p className="msgUpdate">Em breve novas atualizações!</p>
        </section>
      </main>
      <footer>
      <button className="btn btn-comoFunciona">Como Funciona?</button>
      <p>Desenvolvido por <a href="https://luanmiqueias.com.br">Luan Miqueias</a></p>
      </footer>
        </div>
    )
}

export default Landing
