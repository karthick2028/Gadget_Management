const express = require('express');
const { getContentByPage } = require('../controllers/contentController');

const router = express.Router();

router.get('/content/:page', getContentByPage);

module.exports = router;