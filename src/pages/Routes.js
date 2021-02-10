import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loading from "../components/Loading/loading";

import Landing from "./Landing/landing";
import Quiz from "./Quiz/Quiz";
import QuizList from "./QuizList/QuizList";
import Dashboard from "../pages/Dashboard/Dashboard";
import { GlobalContext } from "./GlobalStorage";
import Modal from "../components/Modal/Modal";

function CustomRoute({ isPrivate, ...rest }) {
  const { auth, loading, handleLogin } = React.useContext(GlobalContext);
  React.useEffect(() => handleLogin());
  if (loading) {
    return (
      <div className="center-loading">
        <Loading />
      </div>
    );
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
