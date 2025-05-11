///////////////////////////////////////////IMPORTS///////////////////////////////////////
require('dotenv').config();

///////////////////////////////////////////IMPORT MODELS///////////////////////////////////////

const TaskModel = require('../models/taskModel.js')

///////////////////////////////////////////FUNCTIONS///////////////////////////////////////

//DONE
const getAllTasks = async (req, res) => {
  try {
    const { sortBy = 'createdAt', order = 'desc', state, priority, labels } = req.query;

    // Construcción de filtros
    let filter = {};

    if (state) {
      filter.state = { $in: state.split(',') }; // Filtra por uno o varios estados
    }

    if (priority) {
      filter.priority = { $in: priority.split(',') }; // Filtra por una o más prioridades
    }

    if (labels) {
      filter.labels = { $in: labels.split(',') }; // Filtra por una o más etiquetas
    }

    const sortOrder = order === 'asc' ? 1 : -1; // ascendente o descendente

    const tasks = await TaskModel.find(filter).sort({ [sortBy]: sortOrder });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No se encontraron tareas' });
    }

    return res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ocurrió un error obteniendo las tareas' });
  }
};

//DONE
const createTask = async(req,res) => {
    try {
        const { title, description, state, priority, labels } = req.body;
        const newTask = new TaskModel({
            title,
            description,
            state,
            priority,
            labels
        })
        await newTask.save();
        return res.status(201).json({ message: 'Tarea creada correctamente' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ocurrió un error creando la tarea' });
    }
}

//DONE
const getTaskById = async(req,res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        return res.status(200).json({ task });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ocurrió un error obteniendo la tarea' });
    }
}

//DONE
const updateTask = async(req,res) => {
    try {
        const { id } = req.params;
        const { title, description, state, priority, labels } = req.body;
        const task = await TaskModel.findByIdAndUpdate(id, {
            title,
            description,
            state,
            priority,
            labels
        }, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        return res.status(200).json({ message: 'Tarea actualizada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ocurrió un error actualizando la tarea' });
    }
}

//DONE
const deleteTask = async(req,res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        return res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ocurrió un error eliminando la tarea' });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
}