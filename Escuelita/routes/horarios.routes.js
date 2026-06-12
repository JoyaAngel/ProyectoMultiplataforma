const express = require('express');
const router = express.Router();

const { getHorarios, createHorario, updateHorario, deleteHorario } = require('../controllers/horarios.controller');

router.get('/api/horarios', getHorarios);
router.post('/api/horarios', createHorario);
router.put('/api/horarios/:id', updateHorario);
router.delete('/api/horarios/:id', deleteHorario);

module.exports = router;