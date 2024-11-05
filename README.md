# Proyecto Backend en Node.js

Este es un proyecto backend desarrollado con **Node.js** y **Express**. Proporciona una API RESTful para manejar el registro y la autenticación de usuarios. También incluye otras funcionalidades básicas que puedes extender según las necesidades de tu proyecto.

## Descripción

La API ofrece endpoints para registrar usuarios, autenticarlos, y gestionar la información básica de la cuenta del usuario. Este proyecto usa **JWT (JSON Web Tokens)** para manejar la autenticación y se conecta a una base de datos **MongoDB** para almacenar los datos de los usuarios.

## Características

- **Registro de usuario**: Endpoint para crear un nuevo usuario.
- **Autenticación**: Inicio de sesión usando JWT para generar un token de acceso.
- **Validación de entrada**: Se validan los datos de entrada (como correo electrónico y contraseña) antes de procesarlos.
- **Protección de rutas**: Algunas rutas están protegidas y requieren un token JWT válido para acceder.

## Tecnologías

- **Node.js**: JavaScript runtime para ejecutar el código backend.
- **Express**: Framework web para Node.js.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar la información del usuario.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.
- **JWT (JSON Web Token)**: Para manejar la autenticación y autorización.
- **Bcryptjs**: Para cifrar las contraseñas de los usuarios.
- **dotenv**: Para gestionar las variables de entorno de manera segura.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).

## Estructura del Proyecto

```plaintext
src/
├── config/                # Configuración de la base de datos, variables de entorno
├── controllers/           # Lógica de las rutas, manejo de peticiones
├── middleware/            # Middleware de autenticación y validación
├── models/                # Definición de esquemas de la base de datos
├── routes/                # Definición de las rutas API
├── utils/                 # Funciones y utilidades generales (por ejemplo, generador de JWT)
├── app.js                 # Archivo principal que inicia la aplicación
├── server.js              # Servidor y configuración de Express
