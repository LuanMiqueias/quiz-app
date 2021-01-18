import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './Landing/landing';
import Quiz from './Quiz/Quiz';
import QuizList from './QuizList/QuizList';

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="all" element={<QuizList />} />
        <Route path="quiz/:id/*" element={<Quiz />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
