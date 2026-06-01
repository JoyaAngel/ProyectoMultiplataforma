function isValidSexo(sexo){

    const sexoRegex = /^[MF]$/;

    return sexoRegex.test(sexo);

}

module.exports = {
    isValidSexo
};