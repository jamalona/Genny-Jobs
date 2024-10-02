// import { Request, Response } from "express";
// const Admin = require('../models/Admin');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// interface LoginRequest {
//   username: string;
//   password: string;
// }
// // Login
// export const login = async ( req: Request<{},{}, LoginRequest>, res: Response): Promise<unknown> => {
//   const { username, password } = req.body;
//   try {
//     const admin = await Admin.findOne({ username });
//     if (!admin) return res.status(400).send('Invalid credentials');

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) return res.status(400).send('Invalid credentials');

//     const token = jwt.sign({ id: admin._id }, 'secret', { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).send((err as Error).message);
//   }
// };

// // Logout
// export const logout = (req: Request, res: Response): void => {
//   res.send('Logout endpoint to clear client-side token');
// };

