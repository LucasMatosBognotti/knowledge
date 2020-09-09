import * as Yup from 'yup';
import bcrypt from 'bcryptjs/dist/bcrypt';
import jwt from 'jsonwebtoken';

import connection from '../database';

class SessionContronller {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await connection('users').where('email', email).select('*').first();

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    return res.json({
      user,
      token: jwt.sign({ id: user.id }, 'qwertyuiopasdfghjklçzxcvbnm', { expiresIn: '1h' })
    });

  }
}

export default new SessionContronller();
