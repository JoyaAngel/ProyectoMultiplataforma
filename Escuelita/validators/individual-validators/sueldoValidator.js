// \d en PostgreSQL dice esto del campo sueldo: numeric(10,2),
// número de 10 posiciones, dos son decimales, o sea, 8 posiciones enteras y dos decimales
function isValidSueldo(sueldo) {

    const sueldoRegex = /^\d{1,8}(\.\d{1,2})?$/;

    return sueldoRegex.test(sueldo);

}

module.exports = {
    isValidSueldo
}