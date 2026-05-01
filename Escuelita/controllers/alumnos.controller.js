const { Alumno, Entidad_Federativa } = require('../models');

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

module.exports = {
    getAlumnos,
    createAlumno
};