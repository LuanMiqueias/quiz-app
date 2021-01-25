import React from "react";
import "./style.css";

import Login from "./ModalLogin";
import Cadastrar from "./ModalCadastro";
import CriarQuiz from "./ModalCriarQuiz";

import { GlobalContext } from "../../pages/GlobalStorage";
import { useNavigate } from "react-router-dom";

function Modal({ children, type, titulo, subtitulo, isActive }) {
  const { handleLogin } = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const [inputData, setInputData] = React.useState({
    email: "",
    senha: "",
    nome: "",
  });

  function changeInput(e) {
    const value = e.target.value;
    setInputData({ ...inputData, [e.target.id]: value });
  }
  React.useEffect(() => {
    if (isActive) {
      setModalAtivo(isActive);
    }
    const elementClose = document.querySelectorAll(".close");
    elementClose.forEach((item) => {
      ["click", "touch"].forEach((event) => {
        item.addEventListener(event, (e) => {
          handleClickModal(e);
        });
      });
    });
  });

  const [modalAtivo, setModalAtivo] = React.useState(false);
  const [modalTipo, setModalTipo] = React.useState(type);
  const [loading, setLoading] = React.useState(false);
  const [erroFetch, setErroFetch] = React.useState(null);

  function handleClickModal(e) {
    e.preventDefault();
    if (modalAtivo) {
      if (isActive) {
        return navigate("/");
      }
      const elementContainer = document.querySelector(".container-modal");
      if (elementContainer) {
        elementContainer.classList.add("close-modal");
        setTimeout(() => {
          elementContainer.classList.remove("close-modal");
          setModalAtivo(!modalAtivo);
        }, 200);
      } else {
        setModalAtivo(!modalAtivo);
      }
      return;
    }
    setModalAtivo(!modalAtivo);
  }
  async function handleClickFetch(e) {
    e.preventDefault();
    let typeModal = e.target.dataset.typemodal;
    const form = inputData;
    setLoading(true);
    try {
      const responce = await fetch(
        "https://quizluan.herokuapp.com/" + typeModal,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const json = await responce.json();
      if (!responce.ok) {
        setErroFetch(json.menssage);
        throw Error(json.menssage);
      }
      setErroFetch(null);

      if (typeModal === "login") {
        localStorage.token = json.token;
        const isAuth = await handleLogin();
        setLoading(false);
        if (isAuth) {
          navigate("/dashboard");
        }
      }
      if (typeModal === "register") {
        setModalTipo("login");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  if (!modalAtivo) {
    return (
      <a href="/" onClick={(e) => handleClickModal(e)}>
        {children}
      </a>
    );
  }
  if (modalTipo === "login") {
    return (
      <Login
        onclickForm={(e) => handleClickFetch(e)}
        erroFetch={erroFetch}
        setModalTipo={setModalTipo}
        loading={loading}
        setErroFetch={setErroFetch}
        onChange={(e) => changeInput(e)}
        values={inputData}
      />
    );
  } else if (modalTipo === "cadastrar") {
    return (
      <Cadastrar
        onclickForm={(e) => handleClickFetch(e)}
        erroFetch={erroFetch}
        setModalTipo={setModalTipo}
        setErroFetch={setErroFetch}
        loading={loading}
        onChange={(e) => changeInput(e)}
        values={inputData}
      />
    );
  } else if (modalTipo === "criar") {
    return (
      <CriarQuiz
        // onclickForm={(e) => handleClickFetch(e)}
        erroFetch={erroFetch}
        setModalTipo={setModalTipo}
        setErroFetch={setErroFetch}
        loading={loading}
        onChange={(e) => changeInput(e)}
        values={inputData}
        fecharModal={(e) => {
          handleClickModal(e);
        }}
      />
    );
  }
  // return modalTipo || tiposModal[type];
}

export default Modal;
