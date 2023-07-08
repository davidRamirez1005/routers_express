import express from 'express';
import con from '../server/db.js';

const appRelacionados = express.Router();

/**
 *  ! Metodo GET
 */
appRelacionados.get('/:cliente?', (req, res) => {
    const { cliente } = req.params;

if (cliente) {
    con.query(
    /*dql*/`SELECT * FROM vw_cliente_mascota_carro WHERE cliente LIKE '%${cliente}%'`,
    (err, data, fils) => {
        if (err) {
        res.status(500).json({ error: 'Error en la consulta de la base de datos' });
        } else {
        res.send(data);
        }
    }
    );
} 
else {
    con.query('SELECT * FROM vw_cliente_mascota_carro', (err, data, fils) => {
    if (err) {
        res.status(500).json({ error: 'Error en la consulta de la base de datos' });
    } else {
        res.send(data);
    }
    });
}
});


export default appRelacionados;