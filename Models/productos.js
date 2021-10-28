import mongoose from 'mongoose';
const productosCollection = 'productos';

export const ProductoEsquema = mongoose.Schema({
    idProducto: {type: Number, require: true, min: 1, max: 9999999},
    timestamp: {type: String, require: true},
    Nombre: {type: String, require: true, minLength: 3, maxLenghth: 30},
    Descripcion: {type: String, minLength: 1, maxLenghth: 100},
    Codigo: {type: String, require: true, minLength: 3, maxLenghth: 30},
    Imagen: {type: String, minLength: 1, maxLenghth: 500},
    Precio: {type: Number, require: true, min: 1, max: 9999999},
    Stock: {type: Number, require: true, min: 0, max: 9999999},
    Activo: {type: Boolean, require: true}
});

export const Producto = mongoose.model(productosCollection, ProductoEsquema);