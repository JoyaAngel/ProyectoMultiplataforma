const express = require('express');
const router = express.Router();

const {
    getAlumnos,
    createAlumno,
    updateAlumno,
    deleteAlumno
} = require('../controllers/alumnos.controller');

router.get('/api/alumnos', getAlumnos);
router.post('/api/alumnos', createAlumno);
router.put('/api/alumnos/:id', updateAlumno);
router.delete('/api/alumnos/:id', deleteAlumno);

module.exports = router;