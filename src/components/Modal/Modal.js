import React from "react";
import "./style.css";

import Login from "./ModalLogin";
import Cadastrar from "./ModalCadastro";
import CriarQuiz from "./ModalCriarQuiz";

import { GlobalContext } from "../../pages/GlobalStorage";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/loading";

function Modal({ children, type, titulo, subtitulo, isActive, ...props }) {
  const { handleLogin } = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const [inputData, setInputData] = React.useState({
    email: "",
    senha: "",
    nome: "",
  });

  const [modalAtivo, setModalAtivo] = React.useState(false);
  const [modalTipo, setModalTipo] = React.useState(type);
  const [loading, setLoading] = React.useState(false);
  const [erroFetch, setErroFetch] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [modalAtivo]);

  const handleClickModal = React.useCallback(
    (e) => {
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
    },
    [isActive, modalAtivo, navigate]
  );

  function changeInput(e) {
    const value = e.target.value;
    setInputData({ ...inputData, [e.target.id]: value });
  }
  // React.useEffect(() => {
  //   const elementClose = document.querySelectorAll(".close");
  //   elementClose.forEach((item) => {
  //     ["click", "touch"].forEach((event) => {
  //       item.addEventListener(event, (e) => {
  //         handleClickModal(e);
  //       });
  //     });
  //   });
  //   return () => {
  //     elementClose.forEach((item) => {
  //       ["click", "touch"].forEach((event) => {
  //         item.removeEventListener(event, (e) => handleClickModal(e));
  //       });
  //     });
  //   };
  // }, []);
  const handleClickFetch = React.useCallback((e) => {
    (async () => {
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
          setMounted(true);
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
      setMounted(true);
    })();
  });
  if (!mounted) {
    return <Loading />;
  }
  if (!modalAtivo) {
    return (
      <a href="/" onClick={(e) => handleClickModal(e)} {...props}>
        {children}
      </a>
    );
  }
  if (modalTipo === "login") {
    return (
      <>
        <a href="/" {...props}>
          {children}
        </a>
        <Login
          onclickForm={(e) => handleClickFetch(e)}
          erroFetch={erroFetch}
          setModalTipo={setModalTipo}
          loading={loading}
          setErroFetch={setErroFetch}
          onChange={(e) => changeInput(e)}
          values={inputData}
          fecharModal={(e) => {
            handleClickModal(e);
          }}
          {...props}
        />
      </>
    );
  } else if (modalTipo === "cadastrar") {
    return (
      <>
        <a href="/" {...props}>
          {children}
        </a>
        <Cadastrar
          onclickForm={(e) => handleClickFetch(e)}
          erroFetch={erroFetch}
          setModalTipo={setModalTipo}
          setErroFetch={setErroFetch}
          loading={loading}
          onChange={(e) => changeInput(e)}
          values={inputData}
          fecharModal={(e) => {
            handleClickModal(e);
          }}
          {...props}
        />
      </>
    );
  } else if (modalTipo === "criar") {
    return (
      <>
        <a href="/" {...props}>
          {children}
        </a>
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
          {...props}
        />
      </>
    );
  }
}

export default Modal;
