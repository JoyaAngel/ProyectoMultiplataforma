const express = require('express');
const router = express.Router();

const {
    renderDashboard,
    renderAlumnos,
    renderProfesores,
    renderEntidades,
    renderGrupos,
    renderHorarios
} = require('../controllers/pages.controller');

//principal
router.get('/', renderDashboard);

router.get('/dashboard', renderDashboard);

router.get('/alumnos', renderAlumnos);

router.get('/profesores', renderProfesores);

router.get('/entidades', renderEntidades);

router.get('/grupos', renderGrupos);

router.get('/horarios', renderHorarios);

module.exports = router;
