import Joi from 'joi';

const schema = Joi.object({
    nom_com: Joi.string().min(3).max(20).required(),
    raza : Joi.string().min(0).max(20).required(),
    edad : Joi.number().min(0).max(100).required(),
    id_usuario : Joi.number().required()
});


export default schema;