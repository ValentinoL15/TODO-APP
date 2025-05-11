const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        state: {
            type: String,
            enum: ['Nueva', 'En progreso', 'Bloqueada', 'Completada'],
            default: 'Nueva',
        },
        priority: {
            type: String,
            enum: ['Baja', 'Media', 'Alta', 'Crítica'],
            required: true
        },
        labels: {
            type: [{ name: String }],
            required: false,
        },
    },
    {
        timestamps: true,
        versionKey: false 
    }
)

const TaskModel = mongoose.model('Task', taskSchema);
module.exports = TaskModel;