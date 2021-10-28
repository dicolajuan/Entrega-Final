
import { closeDB, connectDB } from '../Database/MongoDB/conecctionMongo.js';
import { Carrito } from '../Models/carrito.js';
import { Producto } from '../Models/productos.js';

await connectDB();


export const insertDocuments = async (obj,collection) => {
    collection == 'producto' ? await Producto.insertMany(obj) : await Carrito.insertMany(obj);
}

export const getUltimoId = async (collection) => {
    if ( collection == 'producto'){
        let ifExists = await Producto.count();
        if(ifExists == 0){
            let lastId = 1;
            return lastId;
        } else {
            let id = await Producto.findOne({},{idProducto:1, _id:0}).sort({idProducto: -1});
            let lastId = id.idProducto + 1;
            return lastId;
        }
    } else {
        let id = await Carrito.find({},{idCarrito:1, _id:0});
        let lastId = id == 0 ? 1 : id+1;
        return lastId;
    }
}

export const readDocuments = async (collection) => {
    let arrayDocuments = collection == 'producto' ? await Producto.find({Activo: true},{_id:0, __v:0}) : await Carrito.find({Activo: true},{_id:0, __v:0});
    return arrayDocuments;
}

export const readOneDocument = async (collection,id) => {
    let document = collection == 'producto' ? await Producto.findOne({idProducto: id, Activo: true},{_id:0, __v:0}) : await Carrito.findOne({idCarrito: id, Activo: true},{_id:0, __v:0});
    return document;
}

export const updateDocument = async (collection,id, key, value, ...rest) => {
    let update={};
    update[key]=value;
    collection == 'producto' ? await Producto.updateOne({idProducto: id, Activo: true},{$set:update}) : await Carrito.updateOne({idCarrito: id, Activo: true},{$set:update});
}

export const disableDocument = async (collection,id) => {
    let update={};
    update[key]=value;
    collection == 'producto' ? await Producto.updateOne({idProducto: id},{$set: {Activo: false}}) : await Carrito.updateOne({idCarrito: id},{$set:{Activo: false}});
}

export const enableDocument = async (collection,id) => {
    let update={};
    update[key]=value;
    collection == 'producto' ? await Producto.updateOne({idProducto: id},{$set: {Activo: false}}) : await Carrito.updateOne({idCarrito: id},{$set:{Activo: false}});
}