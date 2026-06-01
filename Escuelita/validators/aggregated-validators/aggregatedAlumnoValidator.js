const { isValidNumeroCuenta } = require('../individual-validators/numeroCuentaValidator');
const { isCurpFormatValid } = require('../individual-validators/curpFormatValidator');
const { matchesGivenLength } = require('../individual-validators/anyLengthValidator');
const { isValidSexo } = require('../individual-validators/sexoValidator');
const { isValidEmail } = require('../individual-validators/emailValidator');
const { isIsoDateCompliant } = require('../individual-validators/isoCompliantDateValidator');

function performAlumnoValidations(alumno){

    const {
        numero_cuenta,
        curp,
        telefono,
        sexo,
        correo_electronico,
        fecha_nacimiento
    } = alumno;

    if(!isValidNumeroCuenta(numero_cuenta)){
        return 'El número de cuenta no coincide a nueve dígitos.'
    }

    if(!isCurpFormatValid(curp)){
        return 'La CURP no cumple el formato obligatorio.'
    }

    if(!matchesGivenLength(10, telefono)){
        return 'El teléfono debe ser a 10 dígitos seguidos y sin espacios.'
    }

    if(!isValidSexo(sexo)){
        return 'El sexo no debe de ser de más de un caracter, y debe se ser M o F'
    }

    if(!isValidEmail(correo_electronico)){
        return 'El correo electrónico no cumple la estructura "usuario@dominio.extensión" '
    }

    console.log(`Fecha recibida: ${fecha_nacimiento}`);
    if(!isIsoDateCompliant(fecha_nacimiento)){
        return 'Formato de fecha no reconocido. Debe de ser AAAA-MM-DD.'
    }

    return null;

}

module.exports = {
    performAlumnoValidations
}