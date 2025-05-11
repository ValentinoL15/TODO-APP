const createTask = async(req,res,next) => {
    try {
        const { title, priority } = req.body;
        if(!title) {
            return res.status(400).json({ message: 'El título es obligatorio' });
        }
        if(!priority) {
            return res.status(400).json({ message: 'La prioridad es obligatoria' });
        }
        return next()
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ocurrió un error validando la tarea' });
    }
}

module.exports = { createTask }