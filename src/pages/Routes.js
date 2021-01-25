import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./Landing/landing";
import Quiz from "./Quiz/Quiz";
import QuizList from "./QuizList/QuizList";
import Dashboard from "../pages/Dashboard/Dashboard";
import { GlobalContext } from "./GlobalStorage";
import Modal from "../components/Modal/Modal";

function CustomRoute({ isPrivate, ...rest }) {
  const { auth, loading } = React.useContext(GlobalContext);
  console.log(auth);
  console.log(loading);
  if (loading) {
    return <h1>LOADING....</h1>;
  }
  if (!auth && isPrivate) {
    return <Navigate to="/login" />;
  }
  return <Route {...rest} />;
}

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route
          path="/login"
          exact
          element={
            <Modal type="login" isActive>
              Login {">"}{" "}
            </Modal>
          }
        />
        <Route path="all" element={<QuizList />} />
        <Route path="quiz/:id/*" element={<Quiz />} />
        <Route path="*" element={<Landing />} />
        <CustomRoute isPrivate path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
