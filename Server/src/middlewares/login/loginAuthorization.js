import jwt from 'jsonwebtoken';

class LoginAuthorization {
  async required(request, responce, next) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);
      request.user_id = decode;
      next();
    } catch (error) {
      return responce.status(401).json({ menssage: 'Acesso não autorizado!' });
    }
  }
  async optional(request, responce, next) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);
      request.user_id = decode;
      next();
    } catch (error) {
      next();
    }
  }
}

export default new LoginAuthorization();
