import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    email:String,
    senha:String
})
export default model('user', UserSchema)