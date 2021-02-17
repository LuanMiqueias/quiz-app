import React from "react";
export const GlobalContext = React.createContext();

export function GlobalStorage({ children }) {
  // const [login, setLogin] = React.useState(false);
  const [dados, setDados] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  // const [erro, setErro] = React.useState(null);
  const [auth, setAuth] = React.useState(false);
  React.useMemo(() => {
    IsAuth();
  }, []);
  async function IsAuth() {
    const token = localStorage.token;
    if (token) {
      try {
        const responce = await fetch("https://quizluan.herokuapp.com/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
        });
        if (!responce.ok) {
          setAuth(false);
          setLoading(false);
          return false;
        }
        const dados = await responce.json();
        if (dados) {
          setAuth(true);
          setDados(dados);
          setLoading(false);

          return true;
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    setLoading(false);
    setAuth(false);
    return false;
  }

  async function handleLogin() {
    const login = await IsAuth();
    if (login) {
      setAuth(true);
      setLoading(false);
      return true;
    }
    setAuth(false);
    setDados(null);
    setLoading(false);
    return false;
  }
  function logout(e) {
    e.preventDefault();
    localStorage.token = "";
    setAuth(false);
    setDados(null);
    return true;
  }
  return (
    <GlobalContext.Provider
      value={{ logout, auth, handleLogin, dados, loading, setLoading, IsAuth }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
