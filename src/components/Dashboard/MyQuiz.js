import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/loading";
import "./style.css";

export default function MyQuiz({ title, id }) {
  const [erroFetch, setErroFetch] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function handleExcluirQuiz(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const responce = await fetch(
        // "https://quizluan.herokuapp.com/delete/" + id,
        "http://localhost:21037/delete/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.token,
          },
        }
      );
    } catch (err) {
      console.log(err);
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
