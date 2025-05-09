const { Newsletter } = require('../models/indexModel');

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const existing = await Newsletter.findOne({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already subscribed' });

    const newSub = await Newsletter.create({ email });
    res.status(201).json({ message: 'Subscribed successfully', subscriber: newSub });
  } catch (error) {
    console.error('Newsletter error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
