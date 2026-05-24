const express = require('express');
const router = express.Router();

const { getGrupos, createGrupo, updateGrupo, deleteGrupo } = require('../controllers/grupos.controller');

router.get('/api/grupos', getGrupos);
router.post('/api/grupos', createGrupo);
router.put('/api/grupos/:id', updateGrupo);
router.delete('/api/grupos/:id', deleteGrupo);

module.exports = router;