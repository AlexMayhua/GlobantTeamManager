module.exports = {
  async up(qi, DT) {
    await qi.createTable('usuarios', {
      id: { type: DT.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      nombre: { type: DT.STRING(100), allowNull: false },
      correo: { type: DT.STRING(255), allowNull: false, unique: true },
      password_hash: { type: DT.STRING(255), allowNull: false },
      rol: { type: DT.ENUM('admin','pm','dev','qa','viewer'), allowNull: false, defaultValue: 'dev' },
      estado: { type: DT.ENUM('activo','inactivo'), allowNull: false, defaultValue: 'activo' },
      created_at: { type: DT.DATE, allowNull: false, defaultValue: DT.NOW },
      updated_at: { type: DT.DATE, allowNull: false, defaultValue: DT.NOW }
    });
  },
  async down(qi) { await qi.dropTable('usuarios'); }
};
