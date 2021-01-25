import React from "react";
export const GlobalContext = React.createContext();

export function GlobalStorage({ children }) {
  const [login, setLogin] = React.useState(false);
  const [dadosUser, setDadosUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [erro, setErro] = React.useState(null);
  const [auth, setAuth] = React.useState(false);
  // const navigate = useNavigate();
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
        const dados = await responce.json();
        if (dados) {
          setAuth(true);
          return true;
        }
      } catch (err) {
        console.log(err);
      }
    }
    setAuth(false);
    return false;
  }
  React.useEffect(() => {
    (async () => {
      await IsAuth();
      return setLoading(false);
    })();
  });
  async function handleLogin() {
    const login = await IsAuth();
    console.log(login);
    if (login) {
      setAuth(true);
      console.log(auth);
      setLoading(false);
      return true;
    }
    // setAuth(false);
  }
  function logout(e) {
    e.preventDefault();
    localStorage.token = "";
    setAuth(false);
  }
  return (
    <GlobalContext.Provider
      value={{ logout, dadosUser, auth, loading, handleLogin }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
