const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const { sequelize } = require('./bd');

app.use(express.json());
app.use(express.static(__dirname));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));

// Ruta de páginas
const pagesRouter = require('./routes/pages.routes.js');
app.use(pagesRouter);

// Ruta de APIs
const entidadesRouter = require('./routes/entidades.routes.js');
app.use(entidadesRouter);

const alumnosRouter = require('./routes/alumnos.routes.js');
app.use(alumnosRouter);

const profesorRouter = require('./routes/profesores.routes.js');
app.use(profesorRouter);

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
