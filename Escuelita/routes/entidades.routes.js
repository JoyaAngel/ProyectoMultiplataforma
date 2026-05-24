const express = require('express');
const router = express.Router();

const {
    getEntidades,
    createEntidad,
    updateEntidad,
    deleteEntidad
} = require('../controllers/entidades.controller');

router.get('/api/entidades', getEntidades);
router.post('/api/entidades', createEntidad);
router.put('/api/entidades/:id', updateEntidad);
router.delete('/api/entidades/:id', deleteEntidad);

module.exports = router;