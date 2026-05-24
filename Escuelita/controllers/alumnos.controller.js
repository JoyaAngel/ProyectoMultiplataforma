const { Alumno, Entidad_Federativa } = require('../models');
const { isValidNumeroCuenta} = require('../validators/numeroCuentaValidator');
const { isValidEmail } = require('../validators/emailValidator');
const { isCurpFormatValid } = require('../validators/curpFormatValidator');
const { matchesGivenLength } = require("../validators/anyLengthValidator");
const { isValidSexo } = require('../validators/sexoValidator');
const { isIsoDateCompliant } = require('../validators/isoCompliantDateValidator');

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

        //validaciones nuevas.
        if(!isValidNumeroCuenta(numero_cuenta)){
            return res.status(400).json({
                error: 'El número de cuenta no coincide a nueve dígitos.'
            })
        }

        if(!isCurpFormatValid(curp)){
            return res.status(400).json({
                error: 'La CURP no cumple el formato obligatorio.'
            })
        }

        if(!matchesGivenLength(10, telefono)){
            return res.status(400).json({
                error: 'El teléfono debe ser a 10 dígitos seguidos y sin espacios.'
            })
        }

        if(!isValidSexo(sexo)){
            return res.status(400).json({
                error: 'El sexo no debe de ser de más de un caracter, y debe se ser M o F'
            })
        }

        if(!isValidEmail(correo_electronico)){
            return res.status(400).json({
                error: 'El correo electrónico no cumple la estructura "usuario@dominio.extensión" '
            })
        }

        console.log(`Fecha recibida: ${fecha_nacimiento}`);
        if(!isIsoDateCompliant(fecha_nacimiento)){
            return res.status(400).json({
                error: 'Formato de fecha no reconocido. Debe de ser AAAA-MM-DD.'
            })
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