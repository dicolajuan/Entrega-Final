import express from "express";
import {Product} from "../../../Classes/Product.js";
import { actualizarProductoFS, agregarProductoFS, borrarProductoFS, listarProductosFS } from "../../../Controllers/functionsCRUD-FS.js";
import { actualizarProductoMongo, agregarProductosMongo, borrarProductoMongo, listarProductosMongo } from "../../../Controllers/functionsCRUD-Productos-Mongo.js";
import { actualizarProductoSQL, agregarProductoSQL, borrarProductoSQL, listarProductosSQL } from "../../../Controllers/functionsCRUD-Productos-SQL.js";
export const prodRouter = express.Router();

prodRouter.use(express.json());
prodRouter.use(express.urlencoded({extended:true}));

const isAdmin = process.env.IS_ADMIN;
const TipoPersistencia = process.env.TIPO_PERS;

export const productos = await new Product().getProducts()
    ? await new Product().getProducts() 
    : [];

prodRouter.get('/',(req, res)=>{
    res.json({message:'test route'});
});

prodRouter.get('/listar/:id?', async (req, res)=>{
    try {
        switch (TipoPersistencia) {
            case '1':
                listarProductosFS(req,res);
                break;
            case '2':
                listarProductosSQL(req,res);
                break;
            case '4':
                listarProductosMongo(req,res);
                break;
            default:
                console.log('Tipo de persistencia incorrecta');
                res.status(400).json('Tipo de persistencia incorrecta');
                break;
        }
    } catch (error){
        console.log('Error. Id inexistente',error);
        res.status(400).json('Error al listar producto');
    }
    
});



prodRouter.post('/agregar', (req, res)=>{
    if(isAdmin === "true"){
        try {
            switch (TipoPersistencia) {
                case '1':
                    agregarProductoFS(req,res,productos);
                    break;
                case '2':
                    agregarProductoSQL(req,res);
                    break;
                case '4':
                    agregarProductosMongo(req,res);
                    break;
                default:
                    console.log('Tipo de persistencia incorrecta');
                    res.status(400).json('Tipo de persistencia incorrecta');
                    break;
            }
        } catch (error) {
            
        }
    } else {
        res.status(401).json({error : -1, descripcion: 'ruta producto/agregar m??todo POST no autorizada'});
    }
});

prodRouter.put('/actualizar/:id', (req, res)=>{
    if(isAdmin === "true"){
        try {
            switch (TipoPersistencia) {
                case '1':
                    actualizarProductoFS(req,res,productos);
                    break;
                case '2':
                    actualizarProductoSQL(req,res);
                    break;
                case '4':
                    actualizarProductoMongo(req,res);
                    break;
                default:
                    console.log('Tipo de persistencia incorrecta');
                    res.status(400).json('Tipo de persistencia incorrecta');
                    break;
            }
        } catch (error) {
            console.log('Error al obtener los productos del body', error);
            res.status(400).json('Error al grabar el producto');
        }
    } else {
        res.status(401).json({error : -1, descripcion: 'ruta producto/actualizar m??todo PUT no autorizada'});
    }
})



prodRouter.delete('/borrar/:id', (req, res)=>{
    if(isAdmin === "true"){
        try {
            switch (TipoPersistencia) {
                case '1':
                    borrarProductoFS(req,res,productos);
                    break;
                case '2':
                    borrarProductoSQL(req,res);
                    break;
                case '4':
                    borrarProductoMongo(req,res);
                    break;
                default:
                    console.log('Tipo de persistencia incorrecta');
                    res.status(400).json('Tipo de persistencia incorrecta');
                    break;
            }
        } catch (error) {
            console.log('Error al borrar el producto', error);
            res.status(400).json('Error al borrar el producto');
        }
    } else {
        res.status(401).json({error : -1, descripcion: 'ruta producto/borrar m??todo DELETE no autorizada'});
    }
});

