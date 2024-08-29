import User from '../models/user.js'

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Create a new user
export const createUser = async (req, res) => {
  const { name, email , password , resume } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    // Check if a project with the same name already exists
    const existingUser = await User.findOne({ where: { name , password } });

    if (existingUser) {
      return res.status(400).json({ error: 'A user with this name already exists. Please choose another name.' });
    }

    // Create a new project
    const user = await User.create({ name, email, password,resume:image });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 

//login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid cridentials' });
    }
    // Compare the password with the hashed password in the database
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    var isPasswordValid = false;
    if(password==user.password){
isPasswordValid=true;
    }

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid cridentials'});
    }


    const secretKey = 'abbas'; // Store this in an environment variable
    const payload = { userId: user.id };
    const token=jwt.sign(payload,secretKey,{expiresIn:'1h'})

    // Send the response with user details
    res.status(200).json({
      token,
      message: 'OK'
    });
  } catch (error) {
    res.status(500).json({ message: 'an error occured. try again.' });
  }
};
