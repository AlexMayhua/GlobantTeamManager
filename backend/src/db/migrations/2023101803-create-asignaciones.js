module.exports = {
  async up(qi, DT) {
    await qi.createTable("asignaciones", {
      id: { type: DT.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      id_usuario: { type: DT.BIGINT.UNSIGNED, allowNull: false },
      id_proyecto: { type: DT.BIGINT.UNSIGNED, allowNull: false },
      rol: {
        type: DT.ENUM("dev", "pm", "qa", "ux", "data", "devops"),
        allowNull: false,
        defaultValue: "dev",
      },
      horas_semana: { type: DT.TINYINT.UNSIGNED, allowNull: false },
      fecha_asignacion: {
        type: DT.DATEONLY,
        allowNull: false,
      },
      created_at: { type: DT.DATE, allowNull: false, defaultValue: DT.NOW },
      updated_at: { type: DT.DATE, allowNull: false, defaultValue: DT.NOW },
    });
    await qi.addConstraint("asignaciones", {
      fields: ["id_usuario"],
      type: "foreign key",
      name: "fk_asig_usuario",
      references: { table: "usuarios", field: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await qi.addConstraint("asignaciones", {
      fields: ["id_proyecto"],
      type: "foreign key",
      name: "fk_asig_proyecto",
      references: { table: "proyectos", field: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await qi.addConstraint("asignaciones", {
      fields: ["id_usuario", "id_proyecto"],
      type: "unique",
      name: "uk_asignacion_unica",
    });
    await qi.sequelize.query(
      "ALTER TABLE `asignaciones` ADD CONSTRAINT chk_asig_horas CHECK (horas_semana BETWEEN 0 AND 60);"
    );
    await qi.addIndex("asignaciones", ["id_usuario"], {
      name: "idx_asig_usuario",
    });
    await qi.addIndex("asignaciones", ["id_proyecto"], {
      name: "idx_asig_proyecto",
    });
  },
  async down(qi) {
    await qi.dropTable("asignaciones");
  },
};
