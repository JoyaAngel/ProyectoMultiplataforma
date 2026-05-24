const express = require('express');
const router = express.Router();

const {
    getProfesores,
    createProfesor,
    updateProfesor,
    deleteProfesor
} = require('../controllers/profesores.controller');

router.get('/api/profesores', getProfesores);
router.post('/api/profesores', createProfesor);
router.put('/api/profesores/:id', updateProfesor);
router.delete('/api/profesores/:id', deleteProfesor);

module.exports = router;