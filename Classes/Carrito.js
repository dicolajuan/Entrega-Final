import { Archivo } from "../Server/Archivo.js";

const FILENAME = '../Files/carritos.txt';

export class Carrito {

    constructor(id,timestamp){
        this.id = id,
        this.timestamp = timestamp,
        this.productos = []
    }

    async getCarritoProducts(){
        let rFile = new Archivo(FILENAME);
        let carrito = await rFile.readFile();
        return carrito;
    };

    async getProductByID (id){
        let rFile = new Archivo(FILENAME);
        let carrito = await rFile.readFile();
        return carrito;
    }

    async saveProduct(){
        let sFile = new Archivo(FILENAME);
        await sFile.saveFile(this);
    };


}