const { Profesor } = require('../models');
const { isCurpFormatValid } = require('../validators/curpFormatValidator');
const { isRFCFormatValid } = require('../validators/rfcValidator');
const { matchesGivenLength } = require('../validators/anyLengthValidator');
const {isValidSexo} = require("../validators/sexoValidator");
const {isValidEmail} = require("../validators/emailValidator");

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

        //Nuevas validaciones
        if(!isCurpFormatValid(curp)) {
            return res.status(400).send({
                error: 'La CURP no cumple el formato obligatorio.'
            })
        }

        if(!isRFCFormatValid(rfc)){
            return res.status(400).send({
                error: 'El RFC no cumple con el formato obligatorio.'
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