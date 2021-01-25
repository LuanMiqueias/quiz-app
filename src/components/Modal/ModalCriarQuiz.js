import React from "react";
import Loading from "../../components/Loading/loading";
import seta from "../../assets/icons/iconArrow-left.svg";
function CriarQuiz(
  { onclickForm, setModalTipo, loading, onChange, values, fecharModal },
  ...props
) {
  const [indexPergunta, setIndexPergunta] = React.useState(0);
  const [erroFetch, setErroFetch] = React.useState(null);
  const [styleImg, setStyleImg] = React.useState(true);
  // const [loading, setLoading] = React.useState(false);
  const [inputDados, setInputDados] = React.useState({
    titulo: "",
    descricao: "",
    tags: "",
    perguntas: {
      pergunta1: {
        pergunta: "",
        alternativas: [""],
        correta: "",
      },
    },
  });
  // {...inputDados, [inputDados.pergunta1.alternativas] : "teste"}

  function onChangeInput(e, type) {
    const value = e.target.value;
    if (type === "pergunta") {
      setInputDados((prev) => {
        let dados = { ...prev };
        dados.perguntas["pergunta" + indexPergunta].pergunta = value;
        return { ...dados };
      });
    } else if (type === "alternativa") {
      const indexAlternativa = e.target.id.split("-")[1];
      if (indexAlternativa === "0") {
        setInputDados((prev) => {
          let dados = { ...prev };
          dados.perguntas["pergunta" + indexPergunta].correta = value;
          return { ...dados };
        });
      }
      setInputDados((prev) => {
        let dados = { ...prev };
        dados.perguntas["pergunta" + indexPergunta].alternativas[
          indexAlternativa
        ] = value;
        return { ...dados };
      });
    } else if (type === "inicio") {
      const value = e.target.value;
      console.log(e.target.id);
      if (e.target.id === "tags") {
        const arrayTags = e.target.value.split(",");
        setInputDados({
          ...inputDados,
          [e.target.id]: arrayTags,
        });
        return;
        // console.log(arrayTags);
      }
      setInputDados({
        ...inputDados,
        [e.target.id]: value,
      });

      return;
    }
  }
  console.log(inputDados);
  // console.log(inputDados);
  function scrollTop() {
    window.scroll(0, 0);
  }
  function proximaPergunta() {
    let objBranco = {
      pergunta: "",
      alternativas: [""],
    };
    console.log(indexPergunta);
    scrollTop();
    const newIndex = indexPergunta + 1;
    if (newIndex >= 2) {
      setInputDados((prev) => {
        let dados = { ...prev };
        dados.perguntas["pergunta" + newIndex] = objBranco;
        return dados;
      });
      setIndexPergunta(indexPergunta + 1);
      console.log(inputDados);
    }
  }
  function criarAlternativa(e) {
    e.preventDefault();
    if (inputDados.perguntas["pergunta" + 1].alternativas.length) {
      setInputDados((prev) => {
        let dados = { ...prev };
        dados.perguntas["pergunta" + indexPergunta].alternativas.push("");
        return { ...dados };
      });
      return;
    }

    // setInputDados((prev)  => {
    //   let dados = {...prev};
    //   dados["pergunta" + 1].alternativas = [...dados["pergunta" + indexPergunta].alternativas, {["alternativa" + indexAlternativa]: " "}]
    //   return {...dados}
    // })
  }
  function verificaInput(e, type) {
    if (e.target.dataset.btnaddpergunta) {
      e.preventDefault();
      proximaPergunta();
      verificaLenghtPergunta();
      return;
    } else if (type === "prev") {
      setIndexPergunta(indexPergunta - 1);
      verificaLenghtPergunta();
      return;
    } else if (type === "next") {
      let lengthPerguntas = verificaLenghtPergunta();
      if (lengthPerguntas) {
        console.log("não amigo");
        return;
      }
      setIndexPergunta(indexPergunta + 1);
      verificaLenghtPergunta();
      return;
    }
    setIndexPergunta(indexPergunta + 1);
    console.log(indexPergunta, type);
  }
  function verificaLenghtPergunta() {
    let lengthPerguntas = Object.keys(inputDados.perguntas).length;
    console.log("length:", lengthPerguntas);
    console.log("index", indexPergunta);
    if (lengthPerguntas === indexPergunta) {
      setStyleImg(true);
      return true;
    } else {
      setStyleImg(false);
    }
    return false;
  }
  async function fetchApi(e) {
    e.preventDefault();
    const arrayTags = inputDados.tags.map((item) => {
      return item.trim();
    });
    const form = {
      titulo: inputDados.titulo,
      descricao: inputDados.descricao,
      tags: arrayTags,
      perguntas: [inputDados.perguntas],
    };
    console.log(form);
    try {
      const responce = await fetch("http://localhost:21037/new-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.token,
        },
        body: JSON.stringify(form),
      });
      const json = await responce.json();
      if (!responce.ok) {
        setErroFetch(json.menssage);
        throw Error(json.menssage);
      }
      setErroFetch(null);
    } catch (err) {
      console.log(err);
    }
    fecharModal(e);
  }
  if (indexPergunta === 0) {
    return (
      <section className="container-modal">
        <div className="div-close-modal close"></div>
        <form
          action="POST"
          className="modal modal-criar-quiz"
          data-typemodal="new-question"
          onSubmit={(e) => verificaInput(e, "next")}
        >
          <div className="containerSetas">
            <img src={seta} alt="" /> Quiz{" "}
            <img src={seta} alt="" onClick={(e) => verificaInput(e, "next")} />
          </div>
          <h1>Crie Seu propio quiz!</h1>
          <h2>
            Escolha um titulo, uma descrição e coloque as tags que tem haver com
            seu quiz.
          </h2>
          <div className="input-block">
            <label htmlFor="titulo">
              Titulo
              <input
                type="titulo"
                id="titulo"
                onChange={(e) => onChangeInput(e, "inicio")}
                required
                value={inputDados.titulo}
              />
            </label>
            <label htmlFor="descricao">
              Breve Descrição
              <textarea
                id="descricao"
                name="descricao"
                rows="4"
                cols="50"
                onChange={(e) => onChangeInput(e, "inicio")}
                required
                value={inputDados.descricao}
              ></textarea>
            </label>
            <label htmlFor="tags">
              <p>
                Tags <span>(separe cada um por virgulas)</span>{" "}
              </p>
              <input
                type="text"
                id="tags"
                onChange={(e) => onChangeInput(e, "inicio")}
                required
                value={inputDados.tags}
              />
            </label>
          </div>
          <div className="footer-modal">
            <p className="erroFetch">{erroFetch}</p>
            {loading ? (
              <Loading />
            ) : (
              <>
                <button
                  type="button"
                  className="close"
                  style={{ background: "#D44766" }}
                  className="btn-vermelho"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ background: "#5fcf5c" }}
                  onClick={(e) => {
                    verificaInput(e);
                  }}
                  className="btn-verde"
                >
                  Proximo
                </button>
              </>
            )}
          </div>
        </form>
      </section>
    );
  } else {
    return (
      <section className="container-modal">
        <div className="div-close-modal close"></div>
        <form
          action="POST"
          className="modal modal-criar-quiz"
          data-typemodal="new-question"
          onSubmit={(e) => fetchApi(e)}
        >
          <div className="containerSetas">
            <img
              src={seta}
              alt=""
              onClick={(e) => {
                verificaInput(e, "prev");
              }}
            />{" "}
            Pergunta - {indexPergunta}
            <img
              src={seta}
              alt=""
              className={styleImg ? "disabled" : ""}
              onClick={(e) => {
                verificaLenghtPergunta();
                verificaInput(e, "next");
              }}
            />
          </div>
          <h1>Escreva a pergunta...</h1>
          <h2>
            Coloque a pergunta, adicione as alternativas e marque a correta.
          </h2>
          <div
            className="input-block"
            key={"container-modal-perguntas-" + indexPergunta}
          >
            <label htmlFor="pergunta">
              Pergunta
              <input
                type="pergunta"
                id={"pergunta" + indexPergunta}
                onChange={(e) => onChangeInput(e, "pergunta")}
                required
                value={
                  inputDados.perguntas["pergunta" + indexPergunta].pergunta ||
                  ""
                }
              />
            </label>

            {inputDados.perguntas["pergunta" + indexPergunta].alternativas
              ? inputDados.perguntas[
                  "pergunta" + indexPergunta
                ].alternativas.map((item, index) => {
                  return (
                    <div
                      className="containerAlternativas"
                      key={"alternativas" + index}
                    >
                      <label htmlFor="alternativa">
                        {index === 0
                          ? "Alternativa - correta"
                          : "Alternativa - " + (index + 1)}
                        <input
                          type="text"
                          id={"alternativas-" + index}
                          onChange={(e) => onChangeInput(e, "alternativa")}
                          required
                          // value={values.alternativa}
                          value={
                            inputDados.perguntas["pergunta" + indexPergunta]
                              .alternativas[index]
                          }
                        />
                      </label>
                    </div>
                  );
                })
              : ""}
            <button
              onClick={(e) => criarAlternativa(e)}
              className="buttonAlternativa"
            >
              +
            </button>
          </div>
          <div className="footer-modal">
            <p className="erroFetch">{erroFetch}</p>
            {loading ? (
              <Loading />
            ) : (
              <>
                <button
                  type="submit"
                  onClick={(e) => fetchApi(e)}
                  className="btn-roxo"
                >
                  Criar Quiz
                </button>
                <button
                  data-btnaddpergunta
                  onClick={(e) => {
                    verificaInput(e);
                  }}
                  className="btn-verde"
                >
                  + Pergunta
                </button>
              </>
            )}
          </div>
        </form>
      </section>
    );
  }
}

// function Alternativa() {
//   return (

//   );
// }
export default CriarQuiz;
