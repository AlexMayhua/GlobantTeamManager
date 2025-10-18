const { Usuario } = require("../db");
const bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;
    if (!correo || !password)
      return res
        .status(400)
        .json({ error: "correo y password son requeridos" });
    const exists = await Usuario.findOne({ where: { correo } });
    if (exists) return res.status(409).json({ error: "Usuario ya existe" });
    const password_hash = await bcrypt.hash(password, 10);
    const user = await Usuario.create({ nombre, correo, password_hash, rol });
    return res
      .status(201)
      .json({ id: user.id, correo: user.correo, nombre: user.nombre });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.list = async (req, res) => {
  try {
    const users = await Usuario.findAll({
      attributes: ["id", "nombre", "correo", "rol", "estado", "created_at"],
    });
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, rol, estado, password } = req.body;
    const user = await Usuario.findByPk(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    if (password) {
      user.password_hash = await bcrypt.hash(password, 10);
    }
    if (nombre !== undefined) user.nombre = nombre;
    if (rol !== undefined) user.rol = rol;
    if (estado !== undefined) user.estado = estado;
    await user.save();
    const { password_hash, ...safe } = user.toJSON();
    res.json(safe);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
