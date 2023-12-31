
import validateSchema from '../validators/middleware/middlewareDatos.js'
import schema from '../validators/validadorUsuarios.js'
import express from 'express';
import con from '../server/db.js';

const appUsuario = express.Router();

// ? => significa que puede ser opcional el parametro
// appUsuario.get('/:id?', (req, res) => {
//     console.log(req.params);
//     res.send()
// })
/**
 *  ! Metodo GET
 */
appUsuario.get('/:id?', (req, res) => {
    (req.params.id) ?
        con.query(
            /*sql*/`SELECT * FROM tb_usuarios_M3 WHERE id=${req.params.id}`,
            (err, data, fils) => {
            res.send(data);
        }
        )
    :
    con.query(
        /*sql*/`SELECT * FROM tb_usuarios_M3`,
        (err, data, fils) => {
            res.send(data);
        }
        );
});
/**
 * ! metodo POST
 */
appUsuario.post('/', validateSchema(schema),(req, res) => {
    const body = req.body
        con.query(
        /*sql*/`INSERT INTO tb_usuarios_M3 SET ?`,
        body,
        (err,data,fils) => {
            console.log(err);
            console.log(data);
            console.log(fils);
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
appUsuario.put('/:id',validateSchema(schema), (req, res) => {
    const body = req.body
    con.query(
        /*sql*/`UPDATE tb_usuarios_M3 SET ? WHERE id= ?`,
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
appUsuario.delete('/:id', (req, res) => {
    con.query(
        /*sql*/`DELETE FROM tb_usuarios_M3 WHERE id= ?`,
        req.params.id,
        (err,data,fils) => {
            res.status(204).json({
                message : "se ha eliminado con exito",
                data
            })
        }
    )
})
export default appUsuario;