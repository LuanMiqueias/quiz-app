import React from "react";
import "./style.css";

import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading/loading";
import iconVoltar from '../../assets/icons/iconArrow-left.svg'
import QuizQuestions from "../../components/QuizQuestions/QuizQuestions";

// import "./style.css";

function Quiz() {
  const [pergunta, setPergunta] = React.useState(null);
  const [start, setStart] = React.useState(false);
  const [indexPergunta, setIndexPergunta] = React.useState(0);

  const params = useParams();
  React.useEffect(() => {
    fetch("http://localhost:3030/quiz/" + params.id)
      .then((responce) => responce.json())
      .then((json) => {
        console.log(json);
        setPergunta(json);
      });
  }, []);
  if (pergunta) {
    return (
      <div className="quiz">
        <main>
          <div className="content">
          <Link to="/all" className="btnVoltar"><img src={iconVoltar} alt="Voltar"/></Link>
            {!start ?
            <>
              <h1>{pergunta.titulo}</h1>
              <h2>Preparado?</h2>
              <button className="iniciar" onClick={() => setStart(true)}>Começar</button>
            </>: 
            <>
            <QuizQuestions pergunta={pergunta.perguntas[indexPergunta]}/>
            <button className="btnProxima" onClick={() => setIndexPergunta((ant) => ++ant)}>Proxima</button>
            </>
            }
              
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div className="quiz">
        <main>
          <div className="content">
            <Loading />
          </div>
        </main>
      </div>
    );
  }
}

export default Quiz;
