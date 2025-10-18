const { Proyecto } = require("../db");

exports.list = async (req, res) => {
  const proyectos = await Proyecto.findAll();
  res.json(proyectos);
};

exports.create = async (req, res) => {
  try {
    const proyecto = await Proyecto.create(req.body);
    res.status(201).json(proyecto);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [n] = await Proyecto.update(req.body, { where: { id } });
    if (!n) return res.status(404).json({ error: "No encontrado" });
    const proyecto = await Proyecto.findByPk(id);
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
