const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const { sequelize } = require('./bd');

app.use(express.json());

app.use('/assets/views', (req, res) => res.sendStatus(404));
app.use('/assets/partials', (req, res) => res.sendStatus(404));
app.use('/assets', express.static(path.join(__dirname, 'public'), { index: false }));
app.use('/assets/js', express.static(path.join(__dirname, 'js'), { index: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

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

const horariosRouter = require('./routes/horarios.routes.js');
app.use(horariosRouter);

const gruposRouter = require('./routes/grupos.routes.js');
app.use(gruposRouter);


/*
* sequelize
        .authenticate()
        .then(() => {

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
*/
//Función wrapper para inicializar sequelize.
async function iniciarServer(){

    try{

        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida exitosamente.');

        await sequelize.sync();
        console.log('Modelos sincronizados con la base de datos.');

        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });

    } catch(e){

        console.error('Error al conectar a la base de datos:', error);

    }

}

//Iniciar app
if (require.main === module) {
    iniciarServer();
}
