import express from "express";
import { Carrito } from "../../../Classes/Carrito.js";
import { Product } from "../../../Classes/Product.js";
import { agregarCarritoSQL, borrarCarritoSQL, listarCarritoSQL } from "../../../Controllers/functionsCRUD-Carrito-SQL.js";
import { agregarCarritoFS, borrarCarritoFS, listarCarritoFS } from "../../../Controllers/functionsCRUD-FS.js";
export const carritoRouter = express.Router();

carritoRouter.use(express.json());
carritoRouter.use(express.urlencoded({extended:true}));

const isAdmin = process.env.IS_ADMIN;
const TipoPersistencia = process.env.TIPO_PERS;

const carrito = await createCarrito();

async function createCarrito  () {
    let objCarrito = new Carrito(1,new Date().toLocaleString('es-AR'));

    if (await new Carrito().getCarritoProducts()){
        let objCar = await new Carrito().getCarritoProducts();
        objCarrito.id = objCar.id;
        objCarrito.timestamp = objCar.timestamp;
        objCar.productos.forEach(prod => objCarrito.productos.push(prod));
        return objCarrito;
    } else {
        return objCarrito;
    }
};


carritoRouter.get('/',(req, res)=>{
    res.json({message:'test carrito route'});
});

carritoRouter.get('/listar/:idC/:idP?', async (req, res)=>{
    try {
        switch (TipoPersistencia) {
            case '1':
                listarCarritoFS(req,res,carrito);
                break;
            case '2':
                listarCarritoSQL(req,res);
                break;
            default:
                break;
        }
    } catch (error) {
        console.log('Error. Id inexistente');
        res.status(400).json('Error al listar carrito');
    }
});

// carritoRouter.get('/listar/:idProd?', (req, res)=>{
//     try {
//         let idprod = req.params.idProd;
//         if(idprod){
//             let prod = carrito.productos.find(carProd => carProd.id == idprod);
//             if(prod != null){
//                 res.json({mensaje:`Listar el producto: ${idprod} del carrito`, product:prod});
//             } else {
//                 console.log('Error. Id inexistente');
//                 res.status(400).json('Error al listar carrito');
//             }
//         } else {
//             res.json({message: `listar todos los productos del carrito`,carrito});
//         }
//     } catch {
//         console.log('Error. Id inexistente');
//         res.status(400).json('Error al listar carrito');
//     }
    
// });



carritoRouter.post('/agregar/:idC/:idP?', async (req, res)=>{
    try {
        switch (TipoPersistencia) {
            case '1':
                agregarCarritoFS(req,res,carrito);
                break;
            case '2':
                agregarCarritoSQL(req,res);
                break;
            default:
                break;
        }
    } catch (error) {
        console.log('Error. Id inexistente');
        res.status(400).json('Error al listar carrito');
    }
});

// carritoRouter.post('/agregar/:idP', async (req, res)=>{
//     try {
//         let product = await new Product().findProduct(req.params.idP);
//         if (carrito.productos.find(e => e.id == req.params.idP) == null){
//             product.cantidad = 1;
//             carrito.productos.push(product);
//             carrito.saveProduct();
//             res.json(carrito);
//         } else {
//             let id = parseInt(req.params.idP);
//             let indexObj = carrito.productos.map(e => {return e.id}).indexOf(id);
//             carrito.productos[indexObj].cantidad += 1;
//             carrito.saveProduct();
//             res.json(carrito);
//         }
        
//     } catch {
//         console.log('Error. Id inexistente en carrito');
//         res.status(400).json('Error al agregar el producto al carrito');
//     }
// });

// carritoRouter.delete('/borrar/:idC/:idP', (req, res)=>{
//     res.json({message:`borrar producto id: ${req.params.idP} del carrito id: ${req.params.idC}`});
// });

carritoRouter.delete('/borrar/:idP', async (req, res)=>{
    try {
        let indexObj = carrito.productos.map(e => {return e.id}).indexOf(req.params.idP);
        if( indexObj != -1){
            carrito.productos.splice(indexObj,1);
            res.json(carrito);
        } else {
            console.log('Error. Id inexistente');
            res.status(400).json('Error al borrar el producto del carrito');
        }
    } catch {
        console.log('Error. Id inexistente');
        res.status(400).json('Error al borrar el producto del carrito');
    }
});



carritoRouter.delete('/borrar/:idC/:idP', async (req, res)=>{
    try {
        switch (TipoPersistencia) {
            case '1':
                borrarCarritoFS(req,res,carrito);
                break;
            case '2':
                borrarCarritoSQL(req,res);
                break;
            default:
                break;
        }
    } catch {
        console.log('Error. Id inexistente');
        res.status(400).json('Error al borrar el producto del carrito');
    }
});


