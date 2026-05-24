function isCurpFormatValid(curp){

    //regex para el formato (no validez) de la curp. no lo pienso explicar, esta regex la tengo de hace tiempo.
    const regexCurp = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9]{2}$/;

    return regexCurp.test(curp);

}

module.exports = {
    isCurpFormatValid
}