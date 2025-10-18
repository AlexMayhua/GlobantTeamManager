# Globant Team Manager

Sistema completo de gestión de equipos dockerizado para desarrollo y producción.

## Estructura del Proyecto

```
FULLSTACK/
├── backend/              # API Node.js + Express
│   ├── src/
│   ├── Dockerfile        # Producción
│   └── Dockerfile.dev    # Desarrollo
├── frontend/             # React + Vite
│   ├── src/
│   ├── Dockerfile        # Producción
│   └── Dockerfile.dev    # Desarrollo
├── db/
│   └── init/            # Scripts SQL de inicialización
│       ├── 01-schema.sql
│       └── 02-seed.sql
├── docker-compose.dev.yml   # Configuración desarrollo
├── docker-compose.prod.yml  # Configuración producción
└── .env                     # Variables de entorno
```

## Requisitos

- Docker 20.10+
- Docker Compose 2.0+
- Make (opcional, para usar comandos simplificados)

## Inicio Rápido

### Desarrollo

```bash
docker-compose -f docker-compose.dev.yml up --build
```

O con Make:

```bash
make dev
```

Servicios disponibles:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- MySQL: localhost:3306

### Producción

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

O con Make:

```bash
make prod
```

## Características

### Entorno de Desarrollo

- Hot reload en frontend (Vite)
- Hot reload en backend (nodemon)
- Volúmenes montados para desarrollo en tiempo real
- MySQL con datos de prueba precargados
- Logs en tiempo real

### Entorno de Producción

- Builds optimizados multi-stage
- Imágenes minimizadas (Alpine Linux)
- Usuario no-root para seguridad
- Healthchecks configurados
- Restart automático
- Servidor estático optimizado (serve)

## Base de Datos

La base de datos MySQL se inicializa automáticamente con:

### Tablas

- `users` - Usuarios del sistema
- `teams` - Equipos de trabajo
- `team_members` - Relación usuarios-equipos
- `projects` - Proyectos asignados a equipos

### Datos de Prueba

Usuario admin:

- Email: admin@globant.com
- Password: password (hash bcrypt)

## Comandos Útiles

### Con Make

```bash
make dev            # Levantar desarrollo
make prod           # Levantar producción
make down           # Detener servicios
make clean          # Limpiar todo (contenedores, volúmenes, imágenes)
make logs           # Ver logs de todos los servicios
make backend-logs   # Ver logs del backend
make frontend-logs  # Ver logs del frontend
make db-logs        # Ver logs de MySQL
make rebuild-dev    # Reconstruir imágenes dev sin cache
make rebuild-prod   # Reconstruir imágenes prod sin cache
```

### Con Docker Compose

```bash
docker-compose -f docker-compose.dev.yml up
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml logs -f
docker-compose -f docker-compose.dev.yml ps
docker-compose -f docker-compose.dev.yml exec backend sh
docker-compose -f docker-compose.dev.yml exec db mysql -u globant -psecret globant_tm
```

## Variables de Entorno

Configurar en archivo `.env`:

```env
NODE_ENV=development
PORT=4000
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=globant_tm
DB_USERNAME=globant
DB_PASSWORD=secret
```

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
