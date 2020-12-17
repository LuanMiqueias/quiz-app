import React from "react";
import "./style.css";

function QuizQuestions({pergunta}) {
  const teste = false
  return (
    <div class="pergunta">
      <h1>{pergunta["pergunta"]}</h1>
      <div>
          {pergunta.alternativas.map((alternativa, index) => {
              return (
                  <label htmlFor={"alternativa_"+index} key={index}>
                      <input type="radio" name="alternativa" id={"alternativa_"+index}/>
                      {alternativa}
                  </label>
              )
          })}
      </div>
    </div>
  );
}

export default QuizQuestions;
