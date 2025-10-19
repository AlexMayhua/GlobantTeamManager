'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Asignacion = sequelize.define('Asignacion', {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    id_usuario: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    id_proyecto:{ type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    rol: { type: DataTypes.ENUM('dev','pm','qa','ux','data','devops'), allowNull: false, defaultValue: 'dev' },
    horas_semana: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, validate: { min: 0, max: 60 } },
    fecha_asignacion: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW }
  }, { tableName: 'asignaciones', underscored: true,
       indexes: [{ unique:true, fields:['id_usuario','id_proyecto'] }] });
  Asignacion.associate = (models) => {
    Asignacion.belongsTo(models.Usuario, { as: 'usuario', foreignKey: 'id_usuario', onDelete: 'CASCADE' });
    Asignacion.belongsTo(models.Proyecto,{ as: 'proyecto', foreignKey: 'id_proyecto', onDelete: 'CASCADE' });
  };
  return Asignacion;
};
