import { Router } from 'express';
import QuizController from './controllers/QuizController';
const routes = new Router();

routes.get('/all', QuizController.index);
routes.get('/quiz/:id_pergunta', QuizController.show);
routes.post('/new-question', QuizController.store);
routes.delete('/delete/:id_pergunta', QuizController.delete);

export default routes;
