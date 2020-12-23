import React from 'react';

export const GlobalContext = React.createContext();

export function GlobalStorage({ children }) {
  const [login, setLogin] = React.useState(false);
  const [dadosUser, setDadosUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState(null);

  React.useEffect(() => {
    if (localStorage.token) {
      verificarLogin();
    }
  }, []);

  async function verificarLogin() {
    const token = localStorage.token;
    setLoading(true);
    try {
      const responce = await fetch('http://localhost:21037/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + token,
        },
      });

      if (responce.status === 401) {
        setLoading(false);
        setLogin(false);
        setDadosUser(null);
        return;
      }
      const dados = await responce.json();
      if (dados) {
        setDadosUser(dados);
        setLoading(false);
        setLogin(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function logout(e) {
    e.preventDefault();
    localStorage.token = '';
    setLogin(false);
  }
  return (
    <GlobalContext.Provider
      value={{ login, setLogin, dadosUser, verificarLogin, loading, logout }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
