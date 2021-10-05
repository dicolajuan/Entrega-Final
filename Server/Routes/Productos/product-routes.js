import express from "express";
import {Product} from "../../../Classes/Product.js";
export const prodRouter = express.Router();

prodRouter.use(express.json());
prodRouter.use(express.urlencoded({extended:true}));

const isAdmin = false;

export const productos = new Product().getProducts() 
    ? await new Product().getProducts() 
    : [];

prodRouter.get('/',(req, res)=>{
    res.json({message:'test route'});
});

prodRouter.get('/listar/:id?', async (req, res)=>{
    let id = req.params.id;
    let prodArray = await new Product().getProducts();
    if(id){
        res.status(200).json(
            {prods: prodArray.find(prod => prod.id === id)}
        );

        //res.json({message:`listar producto id: ${req.params.id}`});
    } else {
        console.log(prodArray);
        res.json({prodArray});
    }
    
});

prodRouter.post('/agregar', (req, res)=>{
    isAdmin ? 
                agregarProducto(req,res) 
            : 
                res.status(401).json({error : -1, descripcion: 'ruta producto/agregar método POST no autorizada'});
});

const agregarProducto = (req,res) => {
    try {
        let bodyProd = req.body;
        let objProd = new Product(bodyProd.id,bodyProd.timestamp,bodyProd.name,bodyProd.desc,bodyProd.code,bodyProd.img,bodyProd.price,bodyProd.stock);
        productos.push(objProd);
        objProd.setProduct(productos);
        res.status(200).json({message:'Agregar producto'});
    } catch (error) {
        console.log('Error al obtener los productos del body', error);
        res.status(400).send('<h1 style="color:red"> Parece que hubo un error </h1> ');
    }
};

prodRouter.put('/actualizar/:id', (req, res)=>{
    isAdmin ? 
                actualizarProducto(req,res) 
            : 
                res.status(401).json({error : -1, descripcion: 'ruta producto/actualizar método PUT no autorizada'});
})

const actualizarProducto = (req,res) => {   
    res.status(200).json({message:`actualizar producto id: ${req.params.id}`});
};

prodRouter.delete('/borrar/:id', (req, res)=>{
    isAdmin ? 
                borrarProducto(req,res) 
            : 
                res.status(401).json({error : -1, descripcion: 'ruta producto/borrar método DELETE no autorizada'});
});

const borrarProducto = (req,res) => {
    try{
        console.log(req.params.id);
        let objFind = productos.filter((e) => e.id != req.params.id);
        productos.splice(0, productos.length, ...objFind);
        res.status(200).json(productos);
    } catch {
        console.log('Error. Id inexistente');
        res.status(400).json('<h1 style="color:red"> Parece que hubo un error </h1> ');
    }
};