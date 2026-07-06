const Contact = require('../models/Contact');

// Create contact submission
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    console.log('📧 Contact form submission:', { name, email, subject });
    
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });
    
    await contact.save();
    console.log('✅ Contact form saved successfully:', { name, email, id: contact._id });
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Contact form error:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    console.log('📊 Contact messages requested. Total:', contacts.length);
    res.json(contacts);
  } catch (error) {
    console.error('❌ Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createContact,
  getAllContacts
};