import { Schema, model } from 'mongoose';

const CreateUser = new Schema({
  nome: String,
  email: String,
  senha: String,
});

export default model('User', CreateUser);
