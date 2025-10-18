module.exports = {
  async up(qi, DT) {
    await qi.createTable('proyectos', {
      id: { type: DT.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      nombre: { type: DT.STRING(150), allowNull: false, unique: true },
      descripcion: { type: DT.TEXT },
      estado: { type: DT.ENUM('planificado','en_progreso','pausado','cerrado'), allowNull: false, defaultValue: 'planificado' },
      fecha_inicio: { type: DT.DATEONLY },
      fecha_fin: { type: DT.DATEONLY },
      owner_id: { type: DT.BIGINT.UNSIGNED, allowNull: true },
      created_at: { type: DT.DATE, allowNull: false, defaultValue: DT.NOW },
      updated_at: { type: DT.DATE, allowNull: false, defaultValue: DT.NOW }
    });
    await qi.addConstraint('proyectos', {
      fields: ['owner_id'],
      type: 'foreign key',
      name: 'fk_proyectos_owner',
      references: { table: 'usuarios', field: 'id' },
      onUpdate: 'CASCADE', onDelete: 'SET NULL'
    });
    // Check fecha_fin >= fecha_inicio (MySQL 8+)
    await qi.sequelize.query(
      'ALTER TABLE `proyectos` ADD CONSTRAINT chk_proyectos_fechas CHECK (fecha_fin IS NULL OR fecha_inicio IS NULL OR fecha_fin >= fecha_inicio);'
    );
    await qi.addIndex('proyectos', ['estado'], { name: 'idx_proyectos_estado' });
  },
  async down(qi) { await qi.dropTable('proyectos'); }
};
