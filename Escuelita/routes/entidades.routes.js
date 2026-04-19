const express = require('express');
const router = express.Router();

const {
    getEntidades,
    createEntidad
} = require('../controllers/entidades.controller');

router.get('/entidades', getEntidades);
router.post('/api/entidades', createEntidad);

module.exports = router;