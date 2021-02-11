import React from "react";
import "./style.css";

function QuizQuestions({
  pergunta,
  indexPergunta,
  setRespostas,
  respostas,
  onChange,
}) {
  // console.log(pergunta);
  let indexAlternativa = 0;
  function letraAlternativa(index) {
    const letraArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    indexAlternativa = indexAlternativa + 1;
    return letraArray[index];
  }
  function randomNumber() {
    return 1;
    // return Math.floor(Math.random() * (pergunta.alternativas.length - 1));
  }

  return (
    <>
      <h1>{pergunta.pergunta}</h1>
      <div className="content-pergunta">
        {pergunta.alternativas.map((alternativa, index) => {
          return (
            <label
              htmlFor={"alternativa_" + index}
              key={index}
              style={{ order: randomNumber() }}
              className="alternativa"
            >
              <input
                type="radio"
                name="alternativa"
                id={"alternativa_" + index}
                value={alternativa}
                onChange={onChange}
                checked={respostas["pergunta" + indexPergunta] === alternativa}
              />
              <span>{letraAlternativa(indexAlternativa)}</span>
              <p>{alternativa}</p>
            </label>
          );
        })}
      </div>
    </>
  );
}

export default QuizQuestions;
