Aplicación de Reservación de Hotel
Este proyecto es una aplicación de reservación de hotel que consta de tres componentes principales: backend, frontend y base de datos. Cada componente está organizado en su propio directorio, lo que permite una clara separación de responsabilidades.

Estructura del Proyecto
graphql

hotel-reservation-app
├── backend
│   ├── src
│   │   ├── app.js          # Punto de entrada para la aplicación backend
│   │   ├── controllers     # Contiene la lógica de manejo de solicitudes
│   │   ├── routes          # Define las rutas de la API
│   │   └── models          # Modelos de datos para la aplicación
│   ├── package.json        # Dependencias y scripts del backend
│   └── README.md           # Documentación del backend
├── frontend
│   ├── src
│   │   ├── App.js          # Componente principal para la aplicación frontend
│   │   ├── components      # Componentes reutilizables
│   │   └── pages           # Páginas de la aplicación
│   ├── package.json        # Dependencias y scripts del frontend
│   └── README.md           # Documentación del frontend
├── database
│   ├── migrations          # Scripts SQL para el esquema de la base de datos
│   │   └── init.sql        # Script de inicialización
│   ├── seeders             # Scripts SQL para poblar datos
│   │   └── seed.sql        # Script de datos iniciales
│   └── README.md           # Documentación de la base de datos
└── README.md               # Documentación general de toda la aplicación
Comenzando
Para comenzar con la aplicación de reservación de hotel, sigue las instrucciones en los archivos README ubicados en el directorio de cada componente.

Requisitos Previos
Node.js (para el backend y el frontend)

Una base de datos SQL (para el componente de base de datos)

Instalación
Clona el repositorio:

bash

git clone <repository-url>
cd hotel-reservation-app
Configura el backend:

Navega al directorio backend e instala las dependencias:

bash

cd backend
npm install
Configura el frontend:

Navega al directorio frontend e instala las dependencias:

bash

cd frontend
npm install
Configura la base de datos:

Ejecuta los scripts SQL en los directorios database/migrations y database/seeders para inicializar y poblar la base de datos.

Ejecutando la Aplicación
Inicia el servidor backend:

bash

cd backend
npm start
Inicia la aplicación frontend:

bash

cd frontend
npm start
