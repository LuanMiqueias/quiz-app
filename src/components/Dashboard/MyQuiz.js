import React from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../pages/GlobalStorage";
import Loading from "../Loading/loading";
import "./style.css";

export default function MyQuiz({ title, id, update }) {
  const [erroFetch, setErroFetch] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { setLoading: setLoadingGlobal } = React.useContext(GlobalContext);
  async function handleExcluirQuiz(e) {
    setLoading(true);
    e.preventDefault();
    e.target.parentNode.classList.add("animation-deleteQuiz");
    try {
      const responce = await fetch(
        // "https://quizluan.herokuapp.com/delete/" + id,
        "https://quizluan.herokuapp.com/delete/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.token,
          },
        }
      );
      if (responce.status === 200) {
        return setLoadingGlobal(true);
      } else {
        setErroFetch("erro: " + responce.status);
        setLoading(false);
      }
    } catch (err) {
      // console.log(err);
      setErroFetch("erro: " + err);
      setLoading(false);
    }
    setLoading(false);
  }
  return (
    <div className="myQuiz-item">
      <h2>
        <Link to={"/quiz/" + id}>{title}</Link>
      </h2>
      <p>{erroFetch}</p>
      {loading ? (
        <Loading />
      ) : (
        <button onClick={(e) => handleExcluirQuiz(e)}>Excluir</button>
      )}
    </div>
  );
}
