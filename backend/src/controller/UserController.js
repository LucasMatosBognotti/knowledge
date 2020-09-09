import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import connection from '../database';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, email, password } = req.body;

    const [ userExist ] = await connection('users').where('email', email);

    if (userExist) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await connection('users').insert({
      name,
      email,
      password: password_hash
    });

    return res.json(user);
  }
};

export default new UserController();
