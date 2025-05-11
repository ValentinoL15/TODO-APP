# TODOAPP

## 📝 Descripción

Este proyecto es una aplicación para la gestión de tareas, donde los usuarios pueden crear, editar, eliminar y organizar tareas. Cada tarea tiene una prioridad, estado y etiquetas asociadas, permitiendo una gestión visual y eficiente.

- **Frontend:** Angular + SCSS  
- **Backend:** Node.js + Express + MongoDB  
- **Despliegue en producción:**  
  - Railway (backend)  
  - Vercel (frontend)

---

## ⚙️ Requisitos previos

Antes de empezar, asegurate de tener instalado:

- [Node.js](https://nodejs.org/) (recomendado: v18 o superior)  
- [Angular CLI](https://angular.io/cli) → `npm install -g @angular/cli`  
- [MongoDB](https://www.mongodb.com/) (local o MongoDB Atlas)

---

## 🚀 Instalación del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/ValentinoL15/TODO-APP.git
cd TODO-APP
```

---

### 2. Iniciar el Backend

```bash
cd backend
npm install
```

#### Crear archivo `.env`

Dentro del directorio `backend/`, creá un archivo `.env` con el siguiente contenido:

```env
PORT=4000
DATABASE_URI=mongodb://localhost:27017/TODO-APP
```

#### Ejecutar el servidor

```bash
npm run dev
```

> El backend estará corriendo en: `http://localhost:4000`

---

### 3. Iniciar el Frontend

En una terminal nueva:

```bash
cd frontend
npm install
ng serve
```

> El frontend estará corriendo en: `http://localhost:4200`

---

## 📦 Estructura del proyecto

```
TODO-APP/
├── frontend/     → Aplicación Angular
├── backend/      → API Node.js + Express
└── README.md
```

---

## ✅ Funcionalidades

- Crear, editar y eliminar tareas  
- Filtrar tareas por prioridad, estado y etiquetas  
- Guardado persistente en base de datos MongoDB  
- Interfaz mobile-first  

---

## 🌐 Despliegue

- [Frontend en Vercel](https://todo-app-sigma-gilt-45.vercel.app)  
- [Backend en Railway](https://todo-app-production-95bd.up.railway.app)

---

## 🧪 Usuario de Prueba

Puedes acceder rápidamente a la aplicación con el siguiente usuario de prueba:

- 📧 **Email:** `user@gmail.com`  
- 🔐 **Contraseña:** `usuario123`

> Ideal para explorar la app sin necesidad de registrarte.

---

## 🤝 Contribuciones

¡Contribuciones, issues y sugerencias son más que bienvenidas!
