const express = require('express');
const router = express.Router();

const { getGrupos, createGrupo } = require('../controllers/grupos.controller');

router.get('/api/grupos', getGrupos);
router.post('/api/grupos', createGrupo);

module.exports = router;