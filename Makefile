.PHONY: help dev prod down clean logs backend-logs frontend-logs db-logs

help:
	@echo "Comandos disponibles:"
	@echo "  make dev           - Iniciar entorno de desarrollo"
	@echo "  make prod          - Iniciar entorno de producción"
	@echo "  make down          - Detener todos los servicios"
	@echo "  make clean         - Limpiar contenedores, volúmenes e imágenes"
	@echo "  make logs          - Ver logs de todos los servicios"
	@echo "  make backend-logs  - Ver logs del backend"
	@echo "  make frontend-logs - Ver logs del frontend"
	@echo "  make db-logs       - Ver logs de la base de datos"
	@echo "  make rebuild-dev   - Reconstruir imágenes de desarrollo"
	@echo "  make rebuild-prod  - Reconstruir imágenes de producción"

dev:
	docker-compose -f docker-compose.dev.yml up --build

prod:
	docker-compose -f docker-compose.prod.yml up --build -d

down:
	docker-compose -f docker-compose.dev.yml down
	docker-compose -f docker-compose.prod.yml down

clean:
	docker-compose -f docker-compose.dev.yml down -v --rmi all
	docker-compose -f docker-compose.prod.yml down -v --rmi all

logs:
	docker-compose -f docker-compose.dev.yml logs -f

backend-logs:
	docker-compose -f docker-compose.dev.yml logs -f backend

frontend-logs:
	docker-compose -f docker-compose.dev.yml logs -f frontend

db-logs:
	docker-compose -f docker-compose.dev.yml logs -f db

rebuild-dev:
	docker-compose -f docker-compose.dev.yml build --no-cache

rebuild-prod:
	docker-compose -f docker-compose.prod.yml build --no-cache
