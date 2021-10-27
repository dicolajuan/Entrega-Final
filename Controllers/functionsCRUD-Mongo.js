
import { closeDB, connectDB } from '../Database/MongoDB/conecctionMongo';
import { Carrito } from '../Models/carrito';
import { Producto } from '../Models/productos';



export const insertDocuments = async (obj,collection) => {
    await connectDB();
    collection == 'producto' ? await Producto.insertMany(obj) : await Carrito.insertMany(obj)
    await closeDB();
}

export const readDocuments = async (collection) => {
    await connectDB();
    let arrayDocuments = collection == 'producto' ? await Producto.find({},{_id:0, __v:0}) : await Carrito.find({},{_id:0, __v:0});
    await closeDB();
    return arrayDocuments;
}
