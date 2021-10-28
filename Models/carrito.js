import mongoose from 'mongoose';
import { ProductoEsquema } from './productos.js';

const carritosCollection = 'carritos';

const CarritoEsquema = mongoose.Schema({
    idCarrito: {type: Number, require: true, min: 1, max: 9999999},
    timestamp: {type: Date, default: Date.now},
    productos: [ProductoEsquema]
    // cantidad: {type: Number, require: true, min: 0, max: 9999999} Creo que deberia agregarlo como una key del documento producto cuando lo inserto aca
});

export const Carrito = mongoose.model(carritosCollection, CarritoEsquema);
