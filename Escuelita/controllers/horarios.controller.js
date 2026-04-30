const { Horario } = require('../models');

async function getHorarios(req, res) {

    try{

        const horarios = await Horario.findAll();
        return res.json({data: horarios});

    }catch(e){

        console.error('Error al obtener los horarios:', e);
        return res.status(500).json({ error: 'Error al obtener los horarios' });

    }

}

async function createHorario(req, res) {

    //Miércoles viene sin tilde en la bd, aquí igual irá así.
    //Mismo caso con sábado.
    const diasValidos = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

    try{

        const { dia, hora_inicio, hora_fin} = req.body;

        if(!dia || !hora_inicio || !hora_fin){

            return res.status(400).json({
                error: 'Faltan parámetros obligados: dia, hora_inicio, hora_fin'
            });

        }

        //validación del día
        if(!diasValidos.includes(dia)){

            return res.status(400).json({
                error: 'Día inválido. Debe ser uno de los permitidos.'
            });

        }

        //Validación de la hora de inicio contra la final
        if(hora_inicio < hora_fin){

            return res.status(400).json({
                error: 'La hora de término no puede ser menor a la hora de inicio.'
            });

        }

        const nuevoHorario = await Horario.create({dia, hora_inicio, hora_fin});

        return res.status(201).json({
            message: "Horario creado correctamente",
            data: nuevoHorario
        });


    }catch(e){

        console.error("Error al crear el horario:", e);
        return res.status(500).json({ error: "Error al crear el horario" });

    }

}

module.exports = {
    getHorarios,
    createHorario,
}