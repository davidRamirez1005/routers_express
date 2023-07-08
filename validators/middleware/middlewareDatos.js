import schema from '../validadorUsuarios.js'

// Middleware de validación dinámico
const validateSchema = (schema) => {
    return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
    // Si hay errores de validación, retorna una respuesta de error
    res.status(400).json({ error: error.details[0].message });
    } else {
    // Si los datos son válidos, continúa con el siguiente middleware o la lógica principal
    next();
    }
};
};
export default validateSchema