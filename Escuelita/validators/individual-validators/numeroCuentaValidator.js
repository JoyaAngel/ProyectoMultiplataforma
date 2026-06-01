function isValidNumeroCuenta(numero_cuenta) {

    const numeroCuentaRegex = /^\d{9}$/;

    return numeroCuentaRegex.test(numero_cuenta);

}

module.exports = {
    isValidNumeroCuenta
}