import { dateISOString } from "../Helpers/HelpersDatesFunctions.js";
import { deleteRow, disabledRow, getAll, getOne, insertRow, updateRow } from "./functionsCRUD-SQL.js";


export const listarCarritoSQL = async (req, res) => {
    let {idC, idP} = req.params;
    if (idC){
        let carrito = await getAll('CarritoDet', idC);
        if(idP) {
            let prodFind = carrito.find( prod => { prod.idProducto == idP });
            if (prodFind != null) {
                res.status(200).json({product: prodFind});
            } else {
                console.log('Error. Id inexistente');   
                res.status(400).json('Error al listar producto');
            }
        } else {
            let CarritoProds = await getAll('CarritoDet');
            res.json({CarritoProds: CarritoProds});
        }
    } else {
        console.log('Error. Id inexistente');   
        res.status(400).json('Error al listar carrito');
    }
};

export const agregarCarritoSQL = async (req,res) => {
    let {idC, idP} = req.params;
    if (idC && idP){
        let carrito = await getAll('CarritoDet', idC);
        let carritoFind = carrito.find( Carr => Carr.IdProducto == idP );
        if (carritoFind != null) {
            await updateRow('CarritoDet',idC,'Cantidad',carritoFind.Cantidad+=1,idP);
            res.status(200).json('Producto agregado al carrito');
        } 
        else {
            let objCarrito = {
                idCarrito: idC,
                idProducto: idP,
                Activo: 1,
                Cantidad: 1
            };
            insertRow('CarritoDet',objCarrito);
            res.status(200).json('Producto agregado al carrito');
        }
    } else {
        console.log('Error. Id Carrito inexistente');   
        res.status(400).json('Error al agregar producto');
    }
};

export const borrarCarritoSQL = async (req,res) => {
    let {idC, idP} = req.params;
    if (idC && idP){
        let carrito = await getAll('CarritoDet', idC);
        let carritoFind = carrito.find( Carr => Carr.IdProducto == idP );
        if (carritoFind != null) {
            await deleteRow('CarritoDet',idC,idP);
            res.status(200).json('Producto eliminado al carrito');
        } 
        else {
            console.log('Error. Id Producto inexistente');   
            res.status(400).json('Error al agregar producto');
        }
    } else {
        console.log('Error. Id Carrito inexistente');   
        res.status(400).json('Error al agregar producto');
    }
};