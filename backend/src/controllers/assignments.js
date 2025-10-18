const { Asignacion, Usuario, Proyecto } = require("../db");

exports.create = async (req, res) => {
  try {
    const { id_usuario, id_proyecto, rol, horas_semana, fecha_asignacion } =
      req.body;
    if (!id_usuario || !id_proyecto || !fecha_asignacion)
      return res
        .status(400)
        .json({
          error: "id_usuario, id_proyecto y fecha_asignacion son requeridos",
        });

    // Intentar crear. La constraint única y las FK manejarán integridad; capturamos errores.
    const asign = await Asignacion.create({
      id_usuario,
      id_proyecto,
      rol,
      horas_semana,
      fecha_asignacion,
    });

    // Devolver con relaciones incluidas
    const a = await Asignacion.findByPk(asign.id, {
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nombre", "correo"],
        },
        { model: Proyecto, as: "proyecto", attributes: ["id", "nombre"] },
      ],
    });
    res.status(201).json(a);
  } catch (e) {
    // Manejo básico de errores de integridad
    if (e.name === "SequelizeUniqueConstraintError")
      return res.status(409).json({ error: "La asignación ya existe" });
    if (e.name === "SequelizeForeignKeyConstraintError")
      return res.status(400).json({ error: "Usuario o proyecto no válido" });
    res.status(400).json({ error: e.message });
  }
};

exports.list = async (req, res) => {
  try {
    const asigns = await Asignacion.findAll({
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nombre", "correo"],
        },
        { model: Proyecto, as: "proyecto", attributes: ["id", "nombre"] },
      ],
      order: [["id", "DESC"]],
    });
    res.json(asigns);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const a = await Asignacion.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nombre", "correo"],
        },
        { model: Proyecto, as: "proyecto", attributes: ["id", "nombre"] },
      ],
    });
    if (!a) return res.status(404).json({ error: "No encontrado" });
    res.json(a);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
