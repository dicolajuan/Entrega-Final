import express from "express";
import http from "http";
import {prodRouter} from './Routes/Productos/product-routes.js';

export const app = express();
const serverHTTP = http.Server(app);

// const PORT = proccess.env.PORT || 8080;
const PORT = 8080; //Cambiar al pasar a glitch


app.use('/productos',prodRouter);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

serverHTTP.listen(PORT, () => {
    console.log(`escuchando desde servidor. http://localhost:${PORT}/`);
});

// DEBO IMPLEMENTAR LO RELACIONADO A ISADMIN Y LAS RUTAS DEL CARRITO