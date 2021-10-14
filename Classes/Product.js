import { Archivo } from "../Server/Archivo.js";

const FILENAME = './Files/productos.txt';

export class Product {

    constructor(id,timestamp,name,desc,code,img,price,stock){
        this.id = id,
        this.timestamp = timestamp,
        this.name = name,
        this.description = desc,
        this.code = code,
        this.image = img,
        this.price = price,
        this.stock = stock
    }

    async setProduct(objProduct){
        let sFile = new Archivo(FILENAME);
        await sFile.saveFile(objProduct);
    };

    async getProducts(){
        let rFile = new Archivo(FILENAME);
        let prodArray = await rFile.readFile();
        return prodArray;
    };

    async findProduct(id){
        let rFile = new Archivo(FILENAME);
        let prodArray = await rFile.readFile();
        return prodArray.find(prod => prod.id == id);
    }

    async saveProduct(objProduct){
        let sFile = new Archivo(FILENAME);
        await sFile.saveFile(objProduct);
    };

}