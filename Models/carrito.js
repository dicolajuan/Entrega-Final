import mongoose from 'mongoose';
import { ProductoEsquema } from './productos';

const carritosCollection = 'carritos';

const CarritoEsquema = mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    productos: [ProductoEsquema]
    // cantidad: {type: Number, require: true, min: 0, max: 9999999} Creo que deberia agregarlo como una key del documento producto cuando lo inserto aca
});

export const Carrito = mongoose.model(carritosCollection, CarritoEsquema);
