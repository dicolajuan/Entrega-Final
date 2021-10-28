import { dateISOString } from "../Helpers/HelpersDatesFunctions.js";
import { Producto } from '../Models/productos.js';
import { disableDocument, getUltimoId, insertDocuments, readDocuments, readOneDocument, updateDocument } from './functionsCRUD-Mongo.js';

// await connectDB();s

const collection = 'producto';

export const agregarProductosMongo = async (req,res) => {
    try {
        let obj = req.body;
        let id = await getUltimoId(collection);
        obj.idProducto = id;
        obj.timestamp = dateISOString();
        insertDocuments(obj, collection);
        res.status(200).json({message:'Agregar producto'});
    } catch (error) {
        console.log('Error al obtener los productos del body', error);
        res.status(400).json('Error al grabar el producto');
    }
};


export const listarProductosMongo = async (req,res) => {
    try {
        let id = req.params.id;
        if(id){
            let prodFind = await readOneDocument(collection,id);
            if(prodFind != null) {
                res.status(200).json({product:prodFind});
            } else {
                console.log('Error. Id inexistente');
                res.status(400).json('Error. Id inexistente');
            }
        } else {
            let prodArray = await readDocuments(collection);
            res.json({products: prodArray});
        }
    } catch (error) {
        console.log('Error al leer los productos',error);
        res.status(400).json('Error al leer los productos');
    }
};

export const actualizarProductoMongo = async (req,res) => {
    try {
        const id = req.params.id;
        let bodyProd = req.body;
        const productIndex = await readOneDocument(collection,id);
        const productAttributes = Object.entries(bodyProd);
        productAttributes.forEach(async x =>{
            let attr = x[0];
            let newValue = x[1];
            if(x !== null){
                await updateDocument(collection,id,attr,newValue);
            }
        })
        const newProduct = await readOneDocument(collection,id);
        res.status(200).json({ProductoAntes:productIndex, ProductoDespues: newProduct});
    } catch (error) {
        console.log('Error al obtener los productos del body', error);
        res.status(400).json('Error al grabar el producto');
    }
};

export const borrarProductoMongo = async (req,res) => {
    try {
        let prodFind = await readOneDocument(collection,id);
        if (prodFind != null){
            const id = req.params.id;
            await disableDocument(collection,id);
            res.status(200).json('Producto eliminado');
        } else {
            console.log('Error. Id inexistente');
            res.status(400).json('Error. Id inexistente');
        }
    } catch (error) {
        console.log('Error al borrar el producto');
        res.status(400).json('Error al borrar el producto');
    }
};