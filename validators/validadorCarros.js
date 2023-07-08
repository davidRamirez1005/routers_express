import Joi from 'joi';

const schema = Joi.object({
    marca : Joi.string().min(0).max(20).required(),
    modelo : Joi.any().required(),
    anio : Joi.number().required(),
    id_usuario : Joi.number().required()
});


export default schema;