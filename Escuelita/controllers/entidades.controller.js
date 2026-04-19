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

module.exports = {
    getEntidades,
    createEntidad
};