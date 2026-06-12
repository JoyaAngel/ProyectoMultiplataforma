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
            apellido_materno: apellido_materno || null,
            curp,
            rfc,
            telefono,
            sexo,
            correo_electronico,
            fecha_nacimiento,
            sueldo,
            all_data_professor: {}
        });

        return res.status(201).json({ message: 'Profesor creado correctamente', data: nuevoProfesor });
    } catch (error) {
        console.error('Error al crear el profesor:', error);
        return res.status(500).json({ error: 'Error al crear el profesor' });
    }
}


async function updateProfesor(req, res) {
    try {
        const { id } = req.params;
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
            !curp ||
            !rfc ||
            !telefono ||
            !sexo ||
            !correo_electronico ||
            !fecha_nacimiento ||
            sueldo === undefined || sueldo === null || sueldo === ''
        ) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const profesor = await Profesor.findByPk(id);
        if (!profesor) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }

        await profesor.update({
            nombre,
            apellido_paterno,
            apellido_materno: apellido_materno !== undefined ? apellido_materno : profesor.apellido_materno,
            curp,
            rfc,
            telefono,
            sexo,
            correo_electronico,
            fecha_nacimiento,
            sueldo,
            all_data_professor: profesor.all_data_professor || {}
        });

        return res.status(200).json({ message: 'Profesor actualizado correctamente', data: profesor });
    } catch (error) {
        console.error('Error al actualizar el profesor:', error);
        return res.status(500).json({ error: 'Error al actualizar el profesor' });
    }
}

async function deleteProfesor(req, res) {
    try {
        const { id } = req.params;

        const profesor = await Profesor.findByPk(id);
        if (!profesor) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }

        await profesor.destroy();
        return res.status(200).json({ message: 'Profesor eliminado correctamente', data: profesor });
    } catch (error) {
        console.error('Error al eliminar el profesor:', error);
        return res.status(500).json({ error: 'Error al eliminar el profesor' });
    }
}

module.exports = {
    getProfesores,
    createProfesor,
    updateProfesor,
    deleteProfesor
};