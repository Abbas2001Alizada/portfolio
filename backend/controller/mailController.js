import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import { Message } from '../models/message.js';

dotenv.config();
export const mailer = async (req, res) => {
    try {
        const { formData } = req.body;

        const name=formData.name
        const email=formData.email
        const message=formData.message
        // Validate input (optional but recommended)
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        // Create a transporter object with your email service details
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email address from environment variables
                pass: process.env.EMAIL_PASS, // Your app-specific password from environment variables
            },
        });

        // Set up the email data
        let mailOptions = {
            from: process.env.EMAIL_USER, // Your email address
            to: 'abbas.alizadah1380@gmail.com', // The email address to send the message to
            subject: `Email from ${name} via your portfolio`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Send the email
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: error.toString() });
            }

            // Optionally save form submission to the database using Sequelize
            try {
                await Message.create({
                    name,
                    email,
                    message,
                });
            } catch (dbError) {
                console.error('Error saving to database:', dbError);
                // Consider whether you want to send a response error or still confirm message sent
                return res.status(500).json({ error: 'Message sent, but error saving to database' });
            }

            console.log('Message sent:', info.response);
            res.status(200).json({ message: 'Message sent successfully!' });
        });
    } catch (error) {
        console.error('Error in mailer function:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
};
