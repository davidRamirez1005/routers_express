import {Router} from 'express'
import mysql from 'mysql2'


const appUsuario = Router()
let con = undefined

appUsuario.use((req,res,next)=>{
        con = mysql.createPool({
            host: 'localhost',
            user: 'campus',
            password: 'campus2023',
            database: 'db_M3_prueba_MYSQL2_node_joseDavid',
            port : 3306
        })
        next();
});

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
appUsuario.post('/', (req, res) => {
    con.query(
        /*sql*/`INSERT INTO tb_usuarios_M3 SET ?`,
        req.body,
        (err,data,fils) => {
            console.log(err);
            console.log(data);
            console.log(fils);
            data.affectedRows += 200;
            let resul = req.body;
            resul.id = data.insertId;
            res.status(data.affectedRows).send(resul);
        }
    )
})
/**
 * ! metodo PUT
 */
appUsuario.put('/:id', (req, res) => {
    con.query(
        /*sql*/`UPDATE tb_usuarios_M3 SET ? WHERE id= ?`,
        [req.body, req.params.id],
        (err,data,fils) => {
            res.send(data);
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
            res.send(data);
        }
    )
})


export default appUsuario;