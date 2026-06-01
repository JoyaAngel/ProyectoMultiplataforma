const { isCurpFormatValid } = require('../individual-validators/curpFormatValidator');
const { isRFCFormatValid } = require('../individual-validators/rfcValidator');
const { matchesGivenLength } = require('../individual-validators/anyLengthValidator');
const { isValidSexo } = require("../individual-validators/sexoValidator");
const { isValidEmail } = require("../individual-validators/emailValidator");
const { isIsoDateCompliant } = require("../individual-validators/isoCompliantDateValidator");
const { isValidSueldo } = require("../individual-validators/sueldoValidator");

function performProfesorValidations(profesor){

    const {
        curp,
        rfc,
        telefono,
        sexo,
        correo_electronico,
        fecha_nacimiento,
        sueldo
    } = profesor;

    if(!isCurpFormatValid(curp)) {
        return 'La CURP no cumple el formato obligatorio.';

    }

    if(!isRFCFormatValid(rfc)){
        return 'El RFC no cumple con el formato obligatorio.';
    }

    if(!matchesGivenLength(10, telefono)){
        return 'El teléfono debe ser a 10 dígitos seguidos y sin espacios.';
    }

    if(!isValidSexo(sexo)){
        return 'El sexo no debe de ser de más de un caracter, y debe se ser M o F';

    }

    if(!isValidEmail(correo_electronico)){
        return 'El correo electrónico no cumple la estructura "usuario@dominio.extensión" ';
    }

    console.log(`Fecha recibida: ${fecha_nacimiento}`);
    if(!isIsoDateCompliant(fecha_nacimiento)){
        return 'Formato de fecha no reconocido. Debe de ser AAAA-MM-DD.';

    }

    if(!isValidSueldo(sueldo)){
        return 'El sueldo no puede exceder 8 posiciones enteras y 2 decimales.';
    }

    return null;

}

module.exports = {
    performProfesorValidations
}