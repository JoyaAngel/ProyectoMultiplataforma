const moment = require('moment');

function isIsoDateCompliant(date){

    //fecha, formato, parsing estricto
    if(moment(date, "YYYY-MM-DD", true).isValid()){

        return true;

    }

}

module.exports = {
    isIsoDateCompliant
}