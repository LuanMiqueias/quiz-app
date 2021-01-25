import React from "react";
import "./style.css";
function letraAlternativa(index) {
  const letraArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return letraArray[index];
}
function QuizQuestions({ pergunta, index }) {
  console.log(pergunta);
  return (
    <>
      <h1>{pergunta.pergunta}</h1>
      <div class="content-pergunta">
        {pergunta.alternativas.map((alternativa, index) => {
          return (
            <label htmlFor={"alternativa_" + index} key={index}>
              <input
                type="radio"
                name="alternativa"
                id={"alternativa_" + index}
              />
              <span>{letraAlternativa(index)}</span>
              <p>{alternativa[index]}</p>
            </label>
          );
        })}
      </div>
    </>
  );
}

export default QuizQuestions;
