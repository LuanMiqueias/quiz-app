import Quiz from "../models/Quiz";

class SessionController {
  async index(request, responce) {
    const perguntas = await Quiz.find();
    return responce.json(perguntas);
  }
  async store(request, responce) {
    const { isFavorite, titulo, descricao, tags, perguntas } = request.body;

    const NovaPergunta = await Quiz.create({
      isFavorite,
      titulo,
      descricao,
      tags,
      perguntas,
    });
    return responce.json(NovaPergunta);
  }
  async delete(request, responce) {
    const { id_pergunta } = request.params;

    await Quiz.findByIdAndDelete({ _id: id_pergunta });
    return responce.send();
  }
}

export default new SessionController();
