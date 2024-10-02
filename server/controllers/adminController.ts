<<<<<<< HEAD:server/controllers/adminController.js
// const Admin = require('../models/Admin');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Login
// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const admin = await Admin.findOne({ username });
//     if (!admin) return res.status(400).send('Invalid credentials');
=======
import { Request, Response } from "express";
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

interface LoginRequest {
  username: string;
  password: string;
}
// Login
export const login = async ( req: Request<{},{}, LoginRequest>, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).send('Invalid credentials');
>>>>>>> 43ec9eee28d0fc39b6c5527bdb8bce0c7880ee7e:server/controllers/adminController.ts

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) return res.status(400).send('Invalid credentials');

<<<<<<< HEAD:server/controllers/adminController.js
//     const token = jwt.sign({ id: admin._id }, 'secret', { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// // Logout
// exports.logout = (req, res) => {
//   res.send('Logout endpoint to clear client-side token');
// };
=======
    const token = jwt.sign({ id: admin._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
};

// Logout
export const logout = (req: Request, res: Response): void => {
  res.send('Logout endpoint to clear client-side token');
};

>>>>>>> 43ec9eee28d0fc39b6c5527bdb8bce0c7880ee7e:server/controllers/adminController.ts
