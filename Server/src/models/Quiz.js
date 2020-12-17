import { Schema, model } from "mongoose";

const CreateQuizSchema = new Schema({
  isFavorite: Boolean,
  titulo: String,
  descricao: String,
  tags: Array,
  perguntas: Array,
});
export default model("Quiz", CreateQuizSchema);
