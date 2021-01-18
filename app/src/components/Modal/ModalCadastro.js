import React from 'react';
import Loading from '../../components/Loading/loading';

function Cadastrar(
  {
    onclickForm,
    erroFetch,
    setModalTipo,
    loading,
    setErroFetch,
    onChange,
    values,
  },
  ...props
) {
  return (
    <section className="container-modal">
      <div className="div-close-modal close"></div>
      <form
        action="POST"
        className="modal"
        data-typemodal="register"
        onSubmit={onclickForm}
      >
        <span className="close-modal-span close"></span>
        <h1>Crie sua Conta!</h1>
        <h2>
          Bem-vindo novamente! <span>👋</span>
        </h2>
        <div className="input-block">
          <label htmlFor="nome  ">
            Nome
            <input
              type="text"
              id="nome"
              onInput={onChange}
              required
              value={values.nome}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              onInput={onChange}
              required
              value={values.email}
            />
          </label>
          <label htmlFor="senha">
            Senha
            <input
              type="password"
              id="senha"
              onInput={onChange}
              required
              value={values.senha}
            />
          </label>
        </div>
        <div className="footer-modal">
          <p className="erroFetch">{erroFetch}</p>
          {loading ? <Loading /> : <button type="submit">Cadastrar-se</button>}

          <div className="container-text-footer-modal">
            <p>Já tem uma conta?</p>
            <span
              href="/"
              onClick={(e) => {
                setErroFetch(null);
                return setModalTipo('login');
              }}
            >
              Faça login
            </span>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Cadastrar;
