'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  async up(qi) {
    const hash = await bcrypt.hash('Admin123*', 10);
    await qi.bulkInsert('usuarios', [{
      nombre: 'Admin',
      correo: 'admin@globant.com',
      password_hash: hash,
      rol: 'admin',
      estado: 'activo',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  async down(qi) {
    await qi.bulkDelete('usuarios', { correo: 'admin@globant.com' });
  }
};
