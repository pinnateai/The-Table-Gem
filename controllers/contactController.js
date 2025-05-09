const { Contact } = require('../models/indexModel'); // Use central indexModel
const sendEmail = require('../config/emailService');

// Handle contact form submission
exports.submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Save to DB
    const contact = await Contact.create({ name, email, message });

    // Prepare email
    const subject = 'New Contact Form Submission';
    const body = `From: ${name} <${email}>\n\n${message}`;

    // Send email to admin
    await sendEmail(process.env.ADMIN_EMAIL, subject, body);

    res.status(201).json({
      message: 'Message sent successfully',
      data: contact
    });
  } catch (error) {
    console.error('Contact form error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
