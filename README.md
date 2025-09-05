# Instalar y Configurar APP-VAC-PNI

Configurar Bono Escolar en las Diferentes Ambientes ya se Produccion o Desarrollo.

## Porque Azure Repos?

- [x] Consistent development environment for the entire team.
- [x] You don't need to install a bunch of language environments on your system.
- [x] You can use different versions of the same programming language.
- [x] Deployment is easy

## Como instalar el proyecto

1. ``` ir a la Carpeta de Proyectos en el TFS ```
2. ``` docker-compose exec app composer install ```
3. Copy ```.env.example``` to ```.env```
4. ```docker-compose build```
5. ```docker compose up -d```
6. You can see the project on ```127.0.0.1:8080```

## Como se usa SQL como DB

1. Uncomment the MySQL configuration inside the ```docker-compose.yml``` including: ```db``` and ```phpMyAdmin```
2. Copy ```.env.example``` to ```.env```
3. Change ```DB_CONNECTION``` to ```mysql```
4. Change ```DB_PORT``` to ```3306```
5. Open the ```phpMyAdmin``` on ```127.0.0.1:3400```
