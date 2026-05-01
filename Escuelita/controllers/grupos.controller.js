const { Grupo } = require("../models");

async function getGrupos(req, res) {

    try{

        const grupos = await Grupo.findAll();
        return res.json({data: grupos})

    }catch(e){

        console.error('Error al obtener los grupos:', e);
        return res.status(500).json({ error: 'Error al obtener los grupos' });

    }

}

async function createGrupo(req, res) {

    try{

        const { nombre_grupo } = req.body;

        if(!nombre_grupo){

            return res.status(400).json({
                error: 'Faltan parámetros obligados: nombre_grupo'
            });

        }

        const nuevoGrupo = await Grupo.create({nombre_grupo});

        return res.status(201).json({
            message: "Grupo creado correctamente",
            data: nuevoGrupo
        });

    }catch(e){

        console.error("Error al crear el grupo:", e);
        return res.status(500).json({ error: "Error al crear el grupo" });

    }

}

module.exports = {
    getGrupos,
    createGrupo
}