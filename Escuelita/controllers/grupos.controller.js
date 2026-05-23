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

async function updateGrupo(req, res) {

    try{

        const { id } = req.params;
        const { nombre_grupo } = req.body;

        console.log(`updateGrupo called with id=${id}, nombre_grupo=${nombre_grupo}`);

        if(!nombre_grupo){

            return res.status(400).json({
                error: 'Faltan parámetros obligados: nombre_grupo'
            });

        }

        const grupo = await Grupo.findByPk(id);
        if (!grupo) {
            return res.status(404).json({ error: 'Grupo no encontrado' });
        }

        // Actualizar solo el campo nombre_grupo
        grupo.nombre_grupo = nombre_grupo;
        await grupo.save();

        return res.status(200).json({
            message: "Grupo actualizado correctamente",
            data: grupo
        });

    }catch(e){

        console.error("Error al actualizar el grupo:", e.message);
        console.error("Full error stack:", e.stack);
        return res.status(500).json({ error: "Error al actualizar el grupo" });

    }

}

async function deleteGrupo(req, res) {

    try{

        const { id } = req.params;
        const grupo = await Grupo.findByPk(id);
        if (!grupo) {
            return res.status(404).json({ error: 'Grupo no encontrado' });
        }

        await grupo.destroy();
        return res.status(200).json({
            message: "Grupo eliminado correctamente",
            data: grupo
        });

    }catch(e){

        console.error("Error al eliminar el grupo:", e);
        return res.status(500).json({ error: "Error al eliminar el grupo" });

    }

}

module.exports = {
    getGrupos,
    createGrupo,
    updateGrupo,
    deleteGrupo
}