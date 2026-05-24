const { Entidad_Federativa } = require('../models');

async function getEntidades(req, res) {
    try {
        const entidades = await Entidad_Federativa.findAll();
        return res.json({ data: entidades });
    } catch (error) {
        console.error('Error al obtener las entidades federativas:', error);
        return res.status(500).json({ error: 'Error al obtener las entidades federativas' });
    }
}

async function createEntidad(req, res) {
    try {
        const { nombre_entidad, abreviatura } = req.body;

        if (!nombre_entidad || !abreviatura) {
            return res.status(400).json({
            error: "Faltan campos obligatorios: nombre_entidad y abreviatura"
            });
        }

        const nuevaEntidad = await Entidad_Federativa.create({
            nombre_entidad,
            abreviatura
        });

        return res.status(201).json({
            message: "Entidad creada correctamente",
            data: nuevaEntidad
        });
    } catch (error) {
        console.error("Error al crear la entidad federativa:", error);
        return res.status(500).json({ error: "Error al crear la entidad federativa" });
    }
}


async function updateEntidad(req, res) {
    try {
        const { id } = req.params;
        const { nombre_entidad, abreviatura } = req.body;

        if (!nombre_entidad || !abreviatura) {
            return res.status(400).json({
                error: "Faltan campos obligatorios: nombre_entidad y abreviatura"
            });
        }

        const entidad = await Entidad_Federativa.findByPk(id);
        if (!entidad) {
            return res.status(404).json({ error: 'Entidad no encontrada' });
        }

        await entidad.update({
            nombre_entidad,
            abreviatura
        });

        return res.status(200).json({
            message: "Entidad actualizada correctamente",
            data: entidad
        });
    } catch (error) {
        console.error("Error al actualizar la entidad federativa:", error);
        return res.status(500).json({ error: "Error al actualizar la entidad federativa" });
    }
}

async function deleteEntidad(req, res) {
    try {
        const { id } = req.params;

        const entidad = await Entidad_Federativa.findByPk(id);
        if (!entidad) {
            return res.status(404).json({ error: 'Entidad no encontrada' });
        }

        await entidad.destroy();
        return res.status(200).json({
            message: "Entidad eliminada correctamente",
            data: entidad
        });
    } catch (error) {
        console.error("Error al eliminar la entidad federativa:", error);
        return res.status(500).json({ error: "Error al eliminar la entidad federativa" });
    }
}

module.exports = {
    getEntidades,
    createEntidad,
    updateEntidad,
    deleteEntidad
};