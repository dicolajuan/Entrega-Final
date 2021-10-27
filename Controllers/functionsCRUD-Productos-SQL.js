import { dateISOString } from "../Helpers/HelpersDatesFunctions.js";
import { disabledRow, getAll, getOne, insertRow, updateRow } from "./functionsCRUD-SQL.js";


export const listarProductosSQL = async (req, res) => {
    let id = req.params.id;
    if(id) {
        let prodFind = await getOne('Productos',id);
        if (prodFind != null) {
            res.status(200).json({product: prodFind});
        } else {
            console.log('Error. Id inexistente');
            res.status(400).json('Error al listar producto');
        }
    } else {
        let prodArray = await getAll('Productos');
        res.json({products: prodArray});
    }
};

export const agregarProductoSQL = (req,res) => {
    try {
        let bodyProd = req.body;
        bodyProd.timestamp = dateISOString();
        insertRow('Productos',bodyProd);
        res.status(200).json({message:'Agregar producto'});
    } catch (error) {
        console.log('Error al obtener los productos del body', error);
        res.status(400).json('Error al grabar el producto');
    }
};

export const actualizarProductoSQL = async (req,res) => {
    try {
        const id = req.params.id;
        let bodyProd = req.body;
        const productIndex = await getOne('Productos',id);
        const productAttributes = Object.entries(bodyProd);
        productAttributes.forEach(async x =>{
            let attr = x[0];
            let newValue = x[1];
            if(x !== null){
                await updateRow('Productos',id,attr,newValue);
            }
        })
        const newProduct = await getOne('Productos',id);
        res.status(200).json({ProductoAntes:productIndex, ProductoDespues: newProduct});
    } catch (error) {
        console.log('Error al obtener los productos del body', error);
        res.status(400).json('Error al grabar el producto');
    }
};

export const borrarProductoSQL = async (req,res) => {
    try {
        const id = req.params.id;
        const productIndex = await getOne('Productos',id);
        await disabledRow('Productos',id);
        const newProduct = await getOne('Productos',id);
        res.status(200).json({ProductoAntes:productIndex, ProductoDespues: newProduct});
    } catch (error) {
        console.log('Error al borrar el producto', error);
        res.status(400).json('Error al borrar el producto');
    }
};