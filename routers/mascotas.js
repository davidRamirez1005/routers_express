import validateSchema from '../validators/middleware/middlewareDatos.js'
import schema from '../validators/validadorMascotas.js'
import express from 'express';
import con from '../server/db.js';

const appMascotas = express.Router();

/**
 *  ! Metodo GET
 */
appMascotas.get('/:id?', (req, res) => {
    (req.params.id) ?
        con.query(
            /*sql*/`SELECT * FROM tb_mascota WHERE id=${req.params.id}`,
            (err, data, fils) => {
            res.send(data);
        }
        )
    :
    con.query(
        /*sql*/`SELECT * FROM tb_mascota`,
        (err, data, fils) => {
            res.send(data);
        }
        );
});
/**
 * ! metodo POST
 */
appMascotas.post('/', validateSchema(schema),(req, res) => {
    const body = req.body
        con.query(
        /*sql*/`INSERT INTO tb_mascota SET ?`,
        body,
        (err,data,fils) => {
            data.affectedRows += 200;
            let resul = body;
            resul.id = data.insertId;
            res.status(201).json({
                message : "se ha creado con exito",
                data : resul
            })
        }
    )
})
/**
 * ! metodo PUT
 */
appMascotas.put('/:id',validateSchema(schema), (req, res) => {
    const body = req.body
    con.query(
        /*sql*/`UPDATE tb_mascota SET ? WHERE id= ?`,
        [body, req.params.id],
        (err,data,fils) => {
            res.status(202).json({
                message : "se ha actualizado con exito",
                data : body
            })
        }
    )
})
/**
 * ! metodo DELETE
 */
appMascotas.delete('/:id', (req, res) => {
    con.query(
        /*sql*/`DELETE FROM tb_mascota WHERE id= ?`,
        req.params.id,
        (err,data,fils) => {
            res.status(204).json({
                message : "se ha eliminado con exito",
                data
            })
        }
    )
})
export default appMascotas;