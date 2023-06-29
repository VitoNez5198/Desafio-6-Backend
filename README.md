# Desafío 6: Autenticación y Autorización de usuarios con JWT

Este proyecto es un servidor Express que maneja consultas a una base de datos PostgreSQL y utiliza JSON Web Tokens (JWT) para autenticación. 

## Requisitos previos

Antes de ejecutar este proyecto, asegúrate de tener lo siguiente instalado:

- Node.js
- PostgreSQL

Crea un archivo .env en el directorio raíz del proyecto y proporciona los siguientes valores:

    DB_HOST=nombre_del_host
    DB_USER=nombre_de_usuario
    DB_PASSWORD=contraseña
    DB_NAME=base_de_datos
    JWT_SECRET=clave_secreta

Uso

    Inicia el servidor:

    npm run start

    Accede a la API a través de http://localhost:3000.

Endpoints

    POST /usuarios: Crea un nuevo usuario. 

    POST /login: Inicia sesión de usuario. 

    GET /usuarios: Obtiene la información del usuario autenticado. 

