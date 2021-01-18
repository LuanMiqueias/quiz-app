import React from "react";
import Loading from "../../components/Loading/loading";

function Login(
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
        data-typemodal="login"
        onSubmit={onclickForm}
      >
        <span className="close-modal-span close"></span>
        <h1>Login</h1>
        <h2>
          Bem-vindo novamente! <span>✌</span>
        </h2>
        <div className="input-block">
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
          {loading ? (
            <Loading />
          ) : (
            <button type="submit" className="btn-roxo">
              Entrar
            </button>
          )}
          <div className="container-text-footer-modal">
            <p>Não tem uma conta?</p>
            <span
              href="/"
              onClick={(e) => {
                setErroFetch(null);
                return setModalTipo("cadastrar");
              }}
            >
              Crie uma!
            </span>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
