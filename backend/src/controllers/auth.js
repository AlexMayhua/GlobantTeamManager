const { Usuario } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { correo, password } = req.body;
  const user = await Usuario.findOne({ where: { correo } });
  if (!user) return res.status(401).json({ error: "Credenciales inválidas" });
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: "Credenciales inválidas" });
  const token = jwt.sign(
    { id: user.id, rol: user.rol, correo: user.correo },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
  res.json({ token });
};
