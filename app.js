import express from 'express';
import dotenv from 'dotenv'
import appUsuario from './routers/usuarios.js';


dotenv.config();
const appExpress = express()

appExpress.use(express.json())
appExpress.use('/cliente',appUsuario)
appExpress.use('/login',appUsuario)




const port = 3007
const addresses = '172.16.49.20'
appExpress.listen(port, () => {
    console.log(`Servidor escuchando en http://${addresses}:${port}/`);
  });
