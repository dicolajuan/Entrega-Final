import express from "express";
import { Carrito } from "../../../Classes/Carrito.js";
import { Product } from "../../../Classes/Product.js";
export const carritoRouter = express.Router();

carritoRouter.use(express.json());
carritoRouter.use(express.urlencoded({extended:true}));

// export const carritos = [];

const carrito = await createCarrito();
//console.log(carrito);


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
    console.log(carrito.productos.find(e => e.id == 2) == null);
    res.json({message:'test carrito route'});
});

// carritoRouter.get('/listar/:idCarrito/:idProd?', (req, res)=>{
//     let idprod = req.params.idProd;
//     if(idprod){
//         res.json({message:`listar producto id: ${req.params.idProd} del carrito id: ${req.params.idCarrito}`});
//     } else {
//         res.json({message: `listar todos los productos del carrito: ${req.params.idCarrito}`});
//     }
    
// });

carritoRouter.get('/listar/:idProd?', (req, res)=>{
    try {
        let idprod = req.params.idProd;
        if(idprod){
            let prod = carrito.productos.find(carProd => carProd.id == idprod);
            res.json({mensaje:`Listar el producto: ${idprod} del carrito`, product:prod});
        } else {
            res.json({message: `listar todos los productos del carrito`,carrito});
        }
    } catch {
        console.log('Error. Id inexistente');
        res.status(400).json('<h1 style="color:red"> Parece que hubo un error </h1> ');
    }
    
});

// carritoRouter.post('/agregar/:idC/:idP?', async (req, res)=>{
//     let product = await new Product().findProduct(req.params.idP);
//     carrito.addProduct(product);
//     //console.log(carritos.find(car => car.id == req.params.idC) == null);
//     //carritos.find(car => car.id == req.params.idC) == null || carritos.length == 0  ? carritos.push(carrito) : null;
//     res.json(carrito);
// });

carritoRouter.post('/agregar/:idP', async (req, res)=>{
    try {
        let product = await new Product().findProduct(req.params.idP);
        if (carrito.productos.find(e => e.id == req.params.idP) == null){
            product.cantidad = 1;
            carrito.productos.push(product);
            carrito.saveProduct();
            res.json(carrito);
        } else {
            let indexObj = carrito.productos.map(e => {return e.id}).indexOf(req.params.idP);
            carrito.productos[indexObj].cantidad += 1;
            carrito.saveProduct();
            res.json(carrito);
        }
        
    } catch {
        console.log('Error. Id inexistente en carrito');
        res.status(400).json('<h1 style="color:red"> Parece que hubo un error </h1> ');
    }
});

// carritoRouter.delete('/borrar/:idC/:idP', (req, res)=>{
//     res.json({message:`borrar producto id: ${req.params.idP} del carrito id: ${req.params.idC}`});
// });

carritoRouter.delete('/borrar/:idP', async (req, res)=>{
    try {
        let indexObj = carrito.productos.map(e => {return e.id}).indexOf(req.params.idP);
        carrito.productos.splice(indexObj,1);
        res.json(carrito);
    } catch {
        console.log('Error. Id inexistente');
        res.status(400).json('<h1 style="color:red"> Parece que hubo un error </h1> ');
    }
    //res.json({message:`borrar producto id: ${req.params.idP} del carrito id: ${req.params.idC}`});
});