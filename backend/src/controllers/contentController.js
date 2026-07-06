const Content = require('../models/Content');

const getContentByPage = async (req, res) => {
  try {
    const { page } = req.params;
    const content = await Content.find({ page }).sort({ order: 1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error: error.message });
  }
};

module.exports = { getContentByPage };