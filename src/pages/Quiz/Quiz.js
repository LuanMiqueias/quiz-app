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
  const params = useParams();

  function handleChange({ target }) {
    setRespostas({
      ...respostas,
      ["pergunta" + indexPergunta]: target.value,
    });
  }
  React.useEffect(() => {
    fetch("https://quizluan.herokuapp.com/quiz/" + params.id)
      .then((responce) => responce.json())
      .then((json) => {
        console.log(json);
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
  function verAcertos() {
    const totalPerguntas = perguntasLength;
    const respostasPerguntas = resultado;

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
    console.log(corretas.length);
    const acertosPorcentagem = (100 / totalPerguntas) * corretas.length;
    setAcertos(acertosPorcentagem);
    console.log(corretas);
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
              <Link to="/all">Voltar</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
  if (pergunta) {
    // console.log(respostas);
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
