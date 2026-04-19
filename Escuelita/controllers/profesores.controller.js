const { Profesor } = require('../models');

async function getProfesores(req, res) {
    try {
        const profesores = await Profesor.findAll();
        return res.json({ data: profesores });
    } catch (error) {
        console.error('Error al obtener los profesores:', error);
        return res.status(500).json({ error: 'Error al obtener los profesores' });
    }
}

async function createProfesor(req, res) {
    try {
        const {
            nombre,
            apellido_paterno,
            apellido_materno,
            curp,
            rfc,
            telefono,
            sexo,
            correo_electronico,
            fecha_nacimiento,
            sueldo
        } = req.body;

        if (
            !nombre ||
            !apellido_paterno ||
            !apellido_materno ||
            !curp ||
            !rfc ||
            !telefono ||
            !sexo ||
            !correo_electronico ||
            !fecha_nacimiento ||
            !sueldo
        ) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const nuevoProfesor = await Profesor.create({
            nombre,
            apellido_paterno,
            apellido_materno,
            curp,
            rfc,
            telefono,
            sexo,
            correo_electronico,
            fecha_nacimiento,
            sueldo
        });

        return res.status(201).json({ message: 'Profesor creado correctamente', data: nuevoProfesor });
    } catch (error) {
        console.error('Error al crear el profesor:', error);
        return res.status(500).json({ error: 'Error al crear el profesor' });
    }
}

module.exports = {
    getProfesores,
    createProfesor
};