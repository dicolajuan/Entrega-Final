import express from "express";
import http from "http";
import { carritoRouter } from "./Routes/Carrito/carrito-routes.js";
import { prodRouter } from './Routes/Productos/product-routes.js';
// import dotenv from 'dotenv';
// dotenv.config({path: '../appsettings.env'});

export const app = express();
const serverHTTP = http.Server(app);

const PORT = process.env.PORT || 8080;

app.use('/productos',prodRouter);
app.use('/carrito', carritoRouter);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

serverHTTP.listen(PORT, () => {
    console.log(`escuchando desde servidor. http://localhost:${PORT}/`);
});

// DEBO IMPLEMENTAR LO RELACIONADO A ISADMIN Y LAS RUTAS DEL CARRITO