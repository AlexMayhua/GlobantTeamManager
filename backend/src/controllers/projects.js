const { Proyecto, Usuario } = require("../db");

exports.list = async (req, res) => {
  const proyectos = await Proyecto.findAll({
    include: [
      { model: Usuario, as: "owner", attributes: ["id", "nombre", "correo"] },
    ],
  });
  res.json(proyectos);
};

exports.create = async (req, res) => {
  try {
    const proyecto = await Proyecto.create(req.body);
    // devolver con owner incluido si aplica
    const p = await Proyecto.findByPk(proyecto.id, {
      include: [
        { model: Usuario, as: "owner", attributes: ["id", "nombre", "correo"] },
      ],
    });
    res.status(201).json(p);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [n] = await Proyecto.update(req.body, { where: { id } });
    if (!n) return res.status(404).json({ error: "No encontrado" });
    const proyecto = await Proyecto.findByPk(id, {
      include: [
        { model: Usuario, as: "owner", attributes: ["id", "nombre", "correo"] },
      ],
    });
    res.json(proyecto);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const n = await Proyecto.destroy({ where: { id } });
    if (!n) return res.status(404).json({ error: "No encontrado" });
    res.json({ deleted: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
