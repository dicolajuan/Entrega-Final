import fs from 'fs';

export class Archivo {
    
    constructor(fileName) {
        this.fileName = fileName;
    }

    readFile = async () => {
        try{
            let rFile = await fs.promises.readFile(this.fileName, 'utf-8');
            return JSON.parse(rFile);
        } catch {
            return false;
        }
    }

    saveFile = async (object) => {
        try{
            await fs.promises.writeFile(this.fileName,JSON.stringify(object,null,'\t'));
            console.log('Archivo grabado!');
        } catch  {
            throw new Error(`Error al grabar ${this.fileName}`);
        }
    }

    deleteFile = async () => {
        try{
            await fs.promises.unlink(this.fileName);
            console.log('Archivo eliminado!');
        } catch  {
            throw new Error('Error al eliminar');
        }
    }
    

}