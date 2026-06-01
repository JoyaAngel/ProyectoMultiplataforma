const { Alumno, Entidad_Federativa } = require('../models');
const { performAlumnoValidations } = require('../validators/aggregated-validators/aggregatedAlumnoValidator');
async function getAlumnos(req, res) {
    try {
        const alumnos = await Alumno.findAll({
            include: [
                {
                    model: Entidad_Federativa,
                    as: 'entidad_federativa',
                    attributes: ['id_entidad', 'nombre_entidad', 'abreviatura']
                }
            ]
        });
        return res.json({ data: alumnos });
    } catch (error) {
        console.error('Error al obtener los alumnos:', error);
        return res.status(500).json({ error: 'Error al obtener los alumnos' });
    }
}

async function createAlumno(req, res) {
    try {
        const {
            numero_cuenta,
            nombre,
            apellido_paterno,
            apellido_materno,
            curp,
            telefono,
            sexo,
            correo_electronico,
            fecha_nacimiento,
            id_entidad
        } = req.body;

        if (
            !numero_cuenta ||
            !nombre ||
            !apellido_paterno ||
            !curp ||
            !telefono ||
            !sexo ||
            !correo_electronico ||
            !fecha_nacimiento ||
            !id_entidad
        ) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        //uso del validador agregado de alumnos
        const validationError = performAlumnoValidations(req.body);

        //si hay error alguna validación falla, error dice cuál fue
        if(validationError) {
            return res.status(400).json({ error: validationError });
        }


        const nuevoAlumno = await Alumno.create({
            numero_cuenta,
            nombre,
            apellido_paterno,
            apellido_materno: apellido_materno || null,
            curp,
            telefono,
            sexo,
            correo_electronico,
            fecha_nacimiento,
            foto_perfil: null,
            id_entidad
        });

        return res.status(201).json({ message: 'Alumno creado correctamente', data: nuevoAlumno });
    } catch (error) {
        console.error('Error al crear el alumno:', error);
        return res.status(500).json({ error: 'Error al crear el alumno' });
    }
}

async function updateAlumno(req, res) {
    try {
        const { id } = req.params;
        const {
            numero_cuenta,
            nombre,
            apellido_paterno,
            apellido_materno,
            curp,
            telefono,
            sexo,
            correo_electronico,
            fecha_nacimiento,
            id_entidad
        } = req.body;

        if (
            !numero_cuenta ||
            !nombre ||
            !apellido_paterno ||
            !curp ||
            !telefono ||
            !sexo ||
            !correo_electronico ||
            !fecha_nacimiento ||
            !id_entidad
        ) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        //uso del validador agregado de alumnos
        const validationError = performAlumnoValidations(req.body);

        //si hay error alguna validación falla, error dice cuál fue
        if(validationError) {
            return res.status(400).json({ error: validationError });
        }

        const alumno = await Alumno.findByPk(id);
        if (!alumno) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }

        await alumno.update({
            numero_cuenta,
            nombre,
            apellido_paterno,
            apellido_materno: apellido_materno !== undefined ? apellido_materno : alumno.apellido_materno,
            curp,
            telefono,
            sexo,
            correo_electronico,
            fecha_nacimiento,
            id_entidad
        });

        return res.status(200).json({ message: 'Alumno actualizado correctamente', data: alumno });
    } catch (error) {
        console.error('Error al actualizar el alumno:', error);
        return res.status(500).json({ error: 'Error al actualizar el alumno' });
    }
}

async function deleteAlumno(req, res) {
    try {
        const { id } = req.params;

        const alumno = await Alumno.findByPk(id);
        if (!alumno) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }

        await alumno.destroy();
        return res.status(200).json({ message: 'Alumno eliminado correctamente', data: alumno });
    } catch (error) {
        console.error('Error al eliminar el alumno:', error);
        return res.status(500).json({ error: 'Error al eliminar el alumno' });
    }
}

module.exports = {
    getAlumnos,
    createAlumno,
    updateAlumno,
    deleteAlumno
};