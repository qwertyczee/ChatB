const express = require('express');
const router = express.Router();
const { getRooms } = require('../controllers/ChatController');

// GET endpoint pro načtení seznamu serverů
router.get('/rooms', getRooms);

module.exports = router;
