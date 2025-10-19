# Globant Team Manager

Sistema completo de gestión de equipos dockerizado para desarrollo y producción.

## Estructura del Proyecto

```
FULLSTACK/
# GlobantTeamManager

Aplicación fullstack para gestionar proyectos, usuarios y asignaciones.

Stack principal

- Backend: Node.js + Express + Sequelize (MySQL)
- Frontend: React (Vite) + Tailwind + Formik/Yup
- Autenticación: JSON Web Tokens (JWT)

## Resumen rápido

Este repo contiene dos carpetas principales: `backend/` y `frontend/`.

- `backend/`: servidor Express, modelos Sequelize, migraciones y controladores.
- `frontend/`: app React con rutas para login, dashboard, proyectos, usuarios y asignaciones.

## Requisitos

- Node 18+ (solo si ejecutas localmente sin Docker)
- Docker & Docker Compose (recomendado para desarrollo reproducible)

## Variables de entorno (backend)

Archivo `.env` en `backend/` (ejemplo mínimo):

```

PORT=4000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=globant
DB_USER=root
DB_PASS=secret
JWT_SECRET=changeme

````

## Levantar con Docker Compose (desarrollo)

Desde la raíz del proyecto:

```bash
docker-compose -f docker-compose.dev.yml up --build
````

Para parar y eliminar volúmenes:

```bash
docker-compose -f docker-compose.dev.yml down -v
```

El frontend queda en `http://localhost:3000` y el backend en `http://localhost:4000` (valida tus archivos `docker-compose` si cambias puertos).

## Ejecutar localmente sin Docker

Backend:

```bash
cd backend
npm install
# crear .env o exportar variables
npm start
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Migraciones y seeders

Si trabajas localmente puedes ejecutar migraciones con Sequelize CLI:

```bash
cd backend
npx sequelize db:migrate
npx sequelize db:seed:all
```

Si usas Docker Compose, revisa si las migraciones ya se aplican automáticamente al levantar los contenedores.

## Endpoints principales

Autenticación:

- POST /api/login — { correo, password } → devuelve token JWT

Usuarios:

- POST /api/users — crear usuario (público)
- GET /api/users — listar usuarios (protegido)
- PUT /api/users/:id — actualizar usuario (protegido)

Proyectos:

- GET /api/projects — listar proyectos (incluye `owner` si existe)
- POST /api/projects — crear proyecto
- PUT /api/projects/:id — actualizar
- DELETE /api/projects/:id — eliminar

Asignaciones:

- GET /api/assignments — listar asignaciones (incluye `usuario` y `proyecto`)
- GET /api/assignments/:id — obtener una asignación
- POST /api/assignments — crear asignación
DELETE /api/assignments/:id — eliminar

Nota: los endpoints protegidos requieren el header `Authorization: Bearer <token>`.

## Frontend (rutas principales)

- /login
- /dashboard
- /projects
- /users
- /assignments

El frontend guarda el token en `localStorage` y lo añade automáticamente a las peticiones mediante `src/api/http.js`.

## Tips de desarrollo y mejoras pendientes

- Añadir validaciones server-side más robustas.
- Implementar control de roles (ACL) en el backend.
- Agregar tests de integración para endpoints críticos.
- Mejorar feedback en el frontend (toasts, bloqueos mientras se procesan peticiones).

## Cómo contribuir

- Crea una rama desde `develop` y abre un PR con una descripción clara.

---

Si quieres, incluyo ejemplos de `curl` para probar login / creación de recursos y un apartado con comandos Docker más detallados. ¿Te interesa que añada eso ahora?

## Troubleshooting

### El frontend no construye

```bash
cd frontend
sudo chown -R $USER:$(id -g -n) .
rm -rf node_modules package-lock.json
npm install
```

### Permisos de npm requieren sudo

```bash
sudo chown -R $USER:$(id -g -n) /home/axekma/FULLSTACK
mkdir -p "$HOME/.npm-global"
npm config set prefix "$HOME/.npm-global"
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Limpiar completamente Docker

```bash
make clean
docker system prune -a --volumes -f
```

### Ver logs de un servicio específico

```bash
docker-compose -f docker-compose.dev.yml logs -f backend
```

### Acceder a la base de datos

```bash
docker-compose -f docker-compose.dev.yml exec db mysql -u globant -psecret globant_tm
```

## Desarrollo

### Hot Reload

Los cambios en el código se reflejan automáticamente:

- Frontend: Vite detecta cambios y recarga
- Backend: Nodemon reinicia el servidor

### Instalar dependencias

```bash
docker-compose -f docker-compose.dev.yml exec backend npm install <paquete>
docker-compose -f docker-compose.dev.yml exec frontend npm install <paquete>
```

### Ejecutar comandos dentro de contenedores

```bash
docker-compose -f docker-compose.dev.yml exec backend sh
docker-compose -f docker-compose.dev.yml exec frontend sh
```

## Producción

Las imágenes de producción:

- Usan builds multi-stage para reducir tamaño
- No incluyen devDependencies
- Ejecutan con usuario no-root
- Tienen healthchecks configurados
- Se reinician automáticamente en caso de fallo

## Seguridad

- Usuario no-root en contenedores de producción
- Variables de entorno para credenciales sensibles
- Healthchecks para verificar estado de servicios
- Redes Docker aisladas
- .dockerignore para excluir archivos innecesarios

## Licencia

ISC
