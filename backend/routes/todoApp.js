///////////////////////////////////IMPORTS////////////////////////////////////
const express = require('express');
require('dotenv').config();
const router = express.Router();
const TasksController = require('../controllers/taskController')
const { createTask } = require('../middlewares/taskCreate.js')

///////////////////////////////////ROUTES////////////////////////////////////

//OBTENR TODAS LAS TAREAS (Incluido filtros)
router.get('/get-tasks', TasksController.getAllTasks);

//OBTENER UNA TAREA ESPECÍFICA
router.get('/get-task/:id', TasksController.getTaskById);

//CREAR UNA TAREA
router.post('/create-task', [createTask], TasksController.createTask);

//ACTUALIZAR UNA TAREA
router.put('/update-task/:id', TasksController.updateTask);

//ELIMINAR TAREA
router.delete('/delete-task/:id', TasksController.deleteTask);

module.exports = router