function isRFCFormatValid(rfc) {

    //de 3 a 4 letras, fecha en YYMMDD, homoclave de 3 valores alfanuméricos
    const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;

    return rfcRegex.test(rfc);

}

module.exports = {
    isRFCFormatValid
};