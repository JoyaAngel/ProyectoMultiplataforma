const { DataTypes, STRING } = require("sequelize");
const { sequelize } = require("./bd");

const Entidad_Federativa = sequelize.define('Entidad_Federativa', {
    id_entidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre_entidad: { 
        type: DataTypes.STRING,
        allowNull: false
    }, 
    abreviatura: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {  tableName: 'entidad_federativa',
        timestamps: false
});

const Alumno = sequelize.define('Alumno', {
    numero_cuenta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido_paterno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido_materno: {
        type: DataTypes.STRING,
        allowNull: true
    },
    curp: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    sexo: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    foto_perfil: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    id_entidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Entidad_Federativa,
            key: 'id_entidad'
        }
    }
}, {  tableName: 'alumno', timestamps: false });

const Profesor = sequelize.define('Profesor', {
    id_profesor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido_paterno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido_materno: {
        type: DataTypes.STRING,
        allowNull: true
    },
    curp: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    rfc: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    sexo: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    sueldo: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    all_data_professor: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {}
    }
}, { tableName: 'profesor', timestamps: false});

Entidad_Federativa.hasMany(Alumno, {
    foreignKey: 'id_entidad',
    as: 'alumnos'
});
Alumno.belongsTo(Entidad_Federativa, {
    foreignKey: 'id_entidad',
    as: 'entidad_federativa'
});

const Horario = sequelize.define('Horario', {

    id_horario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    dia: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false,
        unique: false
    },
    hora_fin: {
        type: DataTypes.TIME,
        allowNull: false,
        unique: false
    }

}, {tableName: 'horario', timestamps: false});

const Grupo = sequelize.define('Grupo', {

    id_grupo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre_grupo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

}, {tableName: 'grupo', timestamps: false});

module.exports = {
    Entidad_Federativa,
    Alumno,
    Profesor,
    Horario,
    Grupo
};

