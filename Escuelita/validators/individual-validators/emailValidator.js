function isValidEmail(email) {

    //Evalua usuario@dominio.extensión
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);

}

module.exports = {
    isValidEmail
};