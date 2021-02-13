import React from "react";
import "./style.css";

import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading/loading";
import iconVoltar from "../../assets/icons/iconArrow-left.svg";
import QuizQuestions from "../../components/QuizQuestions/QuizQuestions";

// import "./style.css";

function Quiz() {
  const [pergunta, setPergunta] = React.useState(null);
  const [start, setStart] = React.useState(false);
  const [resultado, setResultado] = React.useState(false);
  const [acertos, setAcertos] = React.useState(0);
  const [perguntasLength, setPerguntasLength] = React.useState(0);
  const [indexPergunta, setIndexPergunta] = React.useState(0);
  const [respostas, setRespostas] = React.useState({ pergunta0: {} });

  const [erroFetch, setErroFetch] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const params = useParams();

  function handleChange({ target }) {
    setRespostas({
      ...respostas,
      ["pergunta" + indexPergunta]: target.value,
    });
  }
  React.useMemo(() => {
    fetch("https://quizluan.herokuapp.com/quiz/" + params.id)
      .then((responce) => responce.json())
      .then((json) => {
        setPergunta(json);
        setPerguntasLength(Object.keys(json.perguntas[0]).length);
      });
  }, [setPergunta, params]);
  function handleProximaPergunta(e) {
    if (indexPergunta === perguntasLength - 1) {
      setStart(false);
      verAcertos();
      return setResultado(true);
    } else {
      setIndexPergunta((ant) => ++ant);
    }
  }
  async function updateHistoryAPI(dados) {
    setLoading(true);
    try {
      const responce = await fetch(
        // "https://quizluan.herokuapp.com/delete/" + id,
        "https://quizluan.herokuapp.com/update-historico/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.token,
          },
          body: JSON.stringify(dados),
        }
      );
      if (!responce.ok) {
        if (responce.status === 401) {
          setLoading(false);
          return setErroFetch(null);
        }
        setLoading(false);
        return setErroFetch("Erro tente novamente");
      }
      setErroFetch(null);
    } catch (err) {
      console.log(err);
      setLoading(false);
      return setErroFetch("Erro tente novamente");
    }
    setLoading(false);
  }
  function verAcertos() {
    const totalPerguntas = perguntasLength;

    let arrayPerguntas = [];
    // const teste = ;
    for (let i = 1; i <= totalPerguntas; i++) {
      arrayPerguntas = [
        ...arrayPerguntas,
        pergunta.perguntas[0]["pergunta" + i],
      ];
    }
    const corretas = arrayPerguntas.filter(({ correta }, index) => {
      return respostas["pergunta" + index] === correta;
    });
    const acertosPorcentagem = (100 / totalPerguntas) * corretas.length;
    setAcertos(acertosPorcentagem);
    updateHistoryAPI({
      acertos: corretas.length,
      quiz_id: params.id,
      total: totalPerguntas,
    });
  }
  if (resultado) {
    return (
      <div className="quiz resultado">
        <main>
          <div className="content">
            <div className="content-resultado">
              <h1>Você acertou:</h1>
              {acertos > 50 ? (
                <h2 className="resultadoBom">{acertos}%</h2>
              ) : (
                <h2 className="resultadoRuim">{acertos}%</h2>
              )}
              <p>{erroFetch}</p>
              {loading ? <Loading /> : <Link to="/all">Voltar</Link>}
            </div>
          </div>
        </main>
      </div>
    );
  }
  if (pergunta) {
    return (
      <div className="quiz">
        <main>
          {!start ? (
            <div className="content content-preparar">
              <Link to="/all" className="btnVoltar">
                <img src={iconVoltar} alt="Voltar" />
              </Link>
              <h1>{pergunta.titulo}</h1>
              <h2>Preparado?</h2>
              <button className="iniciar" onClick={() => setStart(true)}>
                Começar
              </button>
            </div>
          ) : (
            <div className="content">
              <div className="pergunta">
                <QuizQuestions
                  pergunta={
                    pergunta.perguntas[0]["pergunta" + (indexPergunta + 1)]
                  }
                  indexPergunta={indexPergunta}
                  respostas={respostas}
                  onChange={(e) => handleChange(e)}
                  checked={respostas}
                />
                <button
                  className="btnProxima"
                  onClick={(e) => handleProximaPergunta(e)}
                >
                  Proxima
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  } else {
    return (
      <div className="quiz">
        <main>
          <div className="content content-preparar">
            <Loading />
          </div>
        </main>
      </div>
    );
  }
}

export default Quiz;
