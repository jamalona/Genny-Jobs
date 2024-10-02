const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

interface LoginRequestBody {
  username: string;
  password: string;
}
// Login
exports.login = async (
  req: Request <LoginRequestBody>,
  res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: admin._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

// Logout
exports.logout = (req: Request, res: Response) => {
  res.send('Logout endpoint to clear client-side token');
};
