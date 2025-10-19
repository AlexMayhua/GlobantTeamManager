'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Proyecto = sequelize.define('Proyecto', {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    descripcion: { type: DataTypes.TEXT },
    estado: { type: DataTypes.ENUM('planificado','en_progreso','pausado','cerrado'), allowNull: false, defaultValue: 'planificado' },
    fecha_inicio: { type: DataTypes.DATEONLY },
    fecha_fin: { type: DataTypes.DATEONLY,
      validate: { isAfterStart(value){ if(value && this.fecha_inicio && value < this.fecha_inicio) throw new Error('fecha_fin >= fecha_inicio'); } } },
    owner_id: { type: DataTypes.BIGINT.UNSIGNED }
  }, { tableName: 'proyectos', underscored: true });
  Proyecto.associate = (models) => {
    Proyecto.belongsTo(models.Usuario, { as: 'owner', foreignKey: 'owner_id' });
    Proyecto.hasMany(models.Asignacion, { as: 'asignaciones', foreignKey: 'id_proyecto', onDelete: 'CASCADE' });
  };
  return Proyecto;
};
