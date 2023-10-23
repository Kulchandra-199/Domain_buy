const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Create a Nodemailer transporter with your email service credentials
const transporter = nodemailer.createTransport({
    host: 'weberse.in',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: 'info@weberse.live', // Your email address
        pass: 'Pp@7884294', // Your email password
    },
});

// API endpoint for sending emails
app.post('/send-email', (req, res) => {
    const { name, email, offer } = req.body;

    // Configure the email data
    const mailOptions = {
        from: 'info@weberse.live', // Sender's email address
        to: 'recipient_email@example.com', // Recipient's email address
        subject: 'New Offer Received',
        text: `Name: ${name}\nEmail: ${email}\nOffer: ${offer}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email: ', error);
            res.status(500).json({ success: false });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ success: true });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
