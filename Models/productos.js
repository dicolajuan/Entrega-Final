let mongoose = require('mongoose');
const productosCollection = 'productos';

export const ProductoEsquema = mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    nombre: {type: String, require: true, minLength: 3, maxLenghth: 30},
    descripcion: {type: String, require: true, minLength: 1, maxLenghth: 100},
    precio: Schema.Types.Decimal128,
    imagen: {type: String, require: true, minLength: 1, maxLenghth: 500},
    stock: {type: Number, require: true, min: 0, max: 9999999},
});

export const Producto = mongoose.model(productosCollection, ProductoEsquema);