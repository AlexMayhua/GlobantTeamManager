'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    correo: { type: DataTypes.STRING(255), allowNull: false, unique: true, validate: { isEmail: true } },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    rol: { type: DataTypes.ENUM('admin','pm','dev','qa','viewer'), allowNull: false, defaultValue: 'dev' },
    estado: { type: DataTypes.ENUM('activo','inactivo'), allowNull: false, defaultValue: 'activo' }
  }, { tableName: 'usuarios', underscored: true });
  Usuario.associate = (models) => {
    Usuario.hasMany(models.Proyecto, { as: 'proyectos', foreignKey: 'owner_id' });
    Usuario.hasMany(models.Asignacion, { as: 'asignaciones', foreignKey: 'id_usuario' });
  };
  return Usuario;
};
