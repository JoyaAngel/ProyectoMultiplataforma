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

async function renderHorarios(req, res) {
    return res.render('horarios', {currentPage: 'horarios'});
}

async function renderGrupos(req, res){
    return res.render('grupos', {currentPage: 'grupos'});
}

module.exports = {
    renderDashboard,
    renderAlumnos,
    renderProfesores,
    renderEntidades,
    renderHorarios,
    renderGrupos
};
