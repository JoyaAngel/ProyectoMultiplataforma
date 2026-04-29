async function renderDashboard(req, res) {
    return res.render('dashboard', { currentPage: 'dashboard' });
}

async function renderAlumnos(req, res) {
    return res.render('alumnos', { currentPage: 'alumnos' });
}

async function renderProfesores(req, res) {
    return res.render('profesores', { currentPage: 'profesores' });
}

async function renderEntidades(req, res) {
    return res.render('entidades', {currentPage: 'entidades'});
}

module.exports = {
    renderDashboard,
    renderAlumnos,
    renderProfesores,
    renderEntidades
};
