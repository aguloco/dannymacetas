const apiController = require('../controllers/apiController');
const express = require('express');
const router = express.Router();

router.get('/usuarios', apiController.usuarios);
router.get('/usuarios/:id', apiController.usuario);

module.exports = router;