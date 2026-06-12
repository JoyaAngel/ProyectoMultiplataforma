const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Configuración para producción (Railway)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Para que Railway no bloquee por seguridad SSL
      }
    }
  });
} else {
  // Configuración para entorno local
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      port: Number(process.env.DB_PORT) || 5432,
  });
}

module.exports = { sequelize };