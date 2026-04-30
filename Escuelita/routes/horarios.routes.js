const express = require('express');
const router = express.Router();

const{getHorarios, createHorario} = require('../controllers/horarios.controller');

router.get('/api/horarios', getHorarios);
router.post('/api/horarios', createHorario);

module.exports = router;