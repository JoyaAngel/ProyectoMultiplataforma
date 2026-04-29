const express = require('express');
const router = express.Router();

const {
    getProfesores,
    createProfesor
} = require('../controllers/profesores.controller');

router.get('/api/profesores', getProfesores);
router.post('/api/profesores', createProfesor);

module.exports = router;