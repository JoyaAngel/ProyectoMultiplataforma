const express = require('express');
const app = express();
const port = 3000;
const { sequelize } = require('./bd');

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
    res.render('views/index');
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