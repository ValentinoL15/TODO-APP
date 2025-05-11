## TODO-APP-SERVICE

## Descripción

Este servicio es una aplicación backend para la gestión de tareas (To-Do List) construida con **Node.js** y **Express.js**. Implementa la arquitectura **MVC (Modelo-Vista-Controlador)** para organizar el código de manera modular y facilitar su mantenimiento.

### Características principales:

- **Modelo (Model)**: Define la estructura de los datos (tareas) y maneja la interacción con la base de datos (MongoDB).
- **Vista (View)**: No se utiliza directamente en el backend, ya que la vista se maneja desde el frontend. Sin embargo, las respuestas JSON servidas por el servidor actúan como la "vista" para las solicitudes realizadas desde el cliente.
- **Controlador (Controller)**: Contiene la lógica de negocio y las funciones que gestionan las rutas de la API. Estos controladores manejan las operaciones CRUD sobre las tareas.
- **Middlewares**: El servicio utiliza middlewares para  validar datos, y manejar errores.
-**Servicio**: La aplicación está desplegada en la plataforma **Railway**, lo que permite acceder al backend de forma pública para pruebas y consumo por parte del frontend.

**La aplicación sigue las mejores prácticas de desarrollo, con un enfoque en la escalabilidad y modularidad, lo que permite añadir nuevas funcionalidades fácilmente.**
