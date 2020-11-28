import User from '../models/User';

class SessionController{
    async store(request, responce){
        const {email, senha} = request.body;

        const user = await User.findOne({email});
        if(!user){
            await User.create({email, senha})
        }
        else{
            return responce.json({menssage:"Usuario já Cadastrado!"})
        }
        return responce.json({"email":email,"senha":senha})
    }
}

export default new SessionController();