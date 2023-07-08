import express from 'express';
import dotenv from 'dotenv'
import appUsuario from './routers/usuarios.js';
import appMascotas from './routers/mascotas.js';
import appCarros from './routers/carros.js';
import appRelacionados from './routers/relacionados.js';



dotenv.config();
const appExpress = express()

appExpress.use(express.json())

appExpress.use('/cliente',appUsuario)
appExpress.use('/mascota',appMascotas)
appExpress.use('/carros',appCarros)
appExpress.use('/relacionados',appRelacionados)


const port = process.env.PORT || 3000
const addresses = process.env.IP
appExpress.listen(port, () => {
  console.log(`Servidor escuchando en http://${addresses}:${port}/`);
});

export default appExpress;