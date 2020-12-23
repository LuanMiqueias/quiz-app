import React from 'react';
import './style.css';

function Modal({ children, type }) {
  const [modalAtivo, setModalAtivo] = React.useState(false);
  const [modalTeste, setModalTeste] = React.useState(null);

  function animarTrocaModal(){
    const elementAnimarModal = document.querySelector('.container-modal .modal .input-block')
    if(elementAnimarModal){
      elementAnimarModal.classList.add('animarModal');
    setTimeout(() => {
      elementAnimarModal.classList.remove('animarModal');
    }, 200);
  }
  }
  function handleClickModal(e) {
    e.preventDefault();
    if (modalAtivo) {
      const elementContainer = document.querySelector('.container-modal')
      if(elementContainer){
        elementContainer.classList.add('close-modal');
        setTimeout(() => {
          elementContainer.classList.remove('close-modal');
          setModalAtivo(!modalAtivo);
        }, 200);
      }else{setModalAtivo(!modalAtivo);}
      return;
    }
    setModalAtivo(!modalAtivo);
  }
  React.useEffect(() =>{
    const elementClose = document.querySelectorAll('.close')
    elementClose.forEach(item => {
      ['click', 'touch'].forEach(event => {
        item.addEventListener(event, (e) => {
          handleClickModal(e)
        })
      })
    })
  })
  if (!modalAtivo) {
    return (
      <a href="/" onClick={(e) => handleClickModal(e)}>
        {children}
      </a>
    );
  }

  const tiposModal = {
    cadastro: (
      <section className="container-modal">
        <div className="div-close-modal close"></div>
        <div className="modal">
        <span className="close-modal-span close" ></span>
          <h1>Crie sua Conta!</h1>
          <h2>Bem-vindo novamente! <span>👋</span></h2>
          <div className="input-block">
            <label htmlFor="email">
              Nome
              <input type="text" id="email" />
            </label>
            <label htmlFor="email">
              Email
              <input type="email" id="email" />
            </label>
            <label htmlFor="senha">
              Senha
              <input type="password" id="senha" />
            </label>
          </div>
          <div className="footer-modal">
            <button>Cadastrar-se</button>
            <div className="container-text-footer-modal">
              <p>Já tem uma conta?</p>
              <span href="/"onClick={(e) => {
                animarTrocaModal();
                return setModalTeste(tiposModal["login"]); }}>Faça login</span>
                </div>
            </div>
        </div>
      </section>
    ),
    login: (
      <section className="container-modal">
        <div
          className="div-close-modal close"
        ></div>
        <div className="modal">
        <span className="close-modal-span close"></span>
          <h1>Login</h1>
          <h2>Bem-vindo novamente! <span>✌</span></h2>
          <div className="input-block">
            <label htmlFor="email">
              Email
              <input type="email" id="email" />
            </label>
            <label htmlFor="senha">
              Senha
              <input type="password" id="senha" />
            </label>
          </div>
          <div className="footer-modal">
            <button>Entrar</button>
            <div className="container-text-footer-modal">
              <p>Não tem uma conta?</p>
              <span href="/" onClick={(e) => {
                animarTrocaModal()
                return setModalTeste(tiposModal["cadastro"]); }}>Crie uma!</span>
            </div>
          </div>
        </div>
      </section>
    ),
  };
  animarTrocaModal()
  return modalTeste || tiposModal[type];
}

export default Modal;
