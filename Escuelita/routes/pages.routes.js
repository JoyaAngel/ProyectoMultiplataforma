const express = require('express');
const router = express.Router();

const {
    renderDashboard,
    renderAlumnos,
    renderProfesores,
    renderEntidades
} = require('../controllers/pages.controller');

router.get('/', renderDashboard);
router.get('/dashboard', renderDashboard);

router.get('/alumnos', renderAlumnos);

router.get('/profesores', renderProfesores);

router.get('/entidades', renderEntidades)

module.exports = router;
