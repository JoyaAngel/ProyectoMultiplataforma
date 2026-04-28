const express = require('express');
const app = express();
const port = 3000;
const { sequelize } = require('./bd');
const { Alumno, Entidad_Federativa } = require('./models');

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.set('views', __dirname);

const entidadesRouter = require('./routes/entidades.routes.js');
app.use(entidadesRouter);

const alumnosRouter = require('./routes/alumnos.routes.js');
app.use(alumnosRouter);

const profesorRouter = require('./routes/profesores.routes.js');
app.use(profesorRouter);

app.get('/', (req, res) => {
    res.render('public/index');
});

app.get('/dashboard', (req, res) => {
    res.render('public/views/dashboard');
});

app.get('/estudiantes', async (req, res) => {
    try {
        const alumnos = await Alumno.findAll({
            include: [{
                model: Entidad_Federativa,
                as: 'entidad_federativa',
                attributes: ['nombre_entidad']
            }]
        });
        res.render('public/views/estudiantes', { alumnos });
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).send('Error al obtener estudiantes');
    }
});

app.get('/maestros', (req, res) => {
    res.render('public/views/maestros');
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida exitosamente.');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Modelos sincronizados con la base de datos.');
        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });