const express = require('express');
const router = express.Router();

const {
    getAlumnos,
    createAlumno
} = require('../controllers/alumnos.controller');

router.get('/api/alumnos', getAlumnos);
router.post('/api/alumnos', createAlumno);

module.exports = router;