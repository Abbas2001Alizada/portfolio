import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js'; // Function to send email
import User from '../models/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Create a new user
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const resume = req.file ? req.file.filename : null; // Handle file upload if applicable

  try {
    // Check if a user with the same name already exists
    const existingUser = await User.findOne({ where: { name } });

    if (existingUser) {
      return res.status(400).json({ error: 'A user with this name already exists. Please choose another name.' });
    }

    // Hash the password using bcrypt
    const saltRounds = 10; // Higher value means stronger hashing but slower performance
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      resume,
    });

    // Send back the created user (without the password)
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      resume: user.resume,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//login

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token for the authenticated user
    const secretKey = 'abbas'; // Store this in an environment variable for better security
    const payload = { userId: user.id };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    // Send the response with the JWT token
    res.status(200).json({
      token,
      message: 'OK',
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};
// In your controller file



export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'No user found with that email' });
    }

    // Generate password reset token
    const token = crypto.randomBytes(32).toString('hex');

    // Save token and expiration date to the user
    user.token = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Send email
    const resetURL = `http://localhost:452/reset-password/${token}`;
    await sendEmail({
      to: email,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n${resetURL}`,
    });

    res.status(200).json({ message: 'Reset link sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while sending the reset link' });
  }
};



export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    console.log(token,password);
    const user = await User.findOne({
      where: {
        token: token,
        // resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });
    console.log(user);

    if (!user) {
      return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
    }
    // Hash the password using bcrypt
    const saltRounds = 10; // Higher value means stronger hashing but slower performance
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Set new password and clear the reset token fields
    user.password = hashedPassword; // Hash the password before saving
    user.token = '';
    user.resetPasswordExpires = '';
    await user.save();

    res.status(200).json({ message: 'Password has been reset' });
  } catch (error) {
    res.status(500).json({ error: 'Error resetting password' });
  }
};

// Update User Credentials Route
export const updateCredentials = async (req, res) => {
  const { currentEmail, newEmail, password, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email: currentEmail } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Update the email and/or password
    user.email = newEmail || user.email;
    user.password = newPassword ? await bcrypt.hash(newPassword, 10) : user.password;

    await user.save();

    res.status(200).json({ message: "Credentials updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
};
