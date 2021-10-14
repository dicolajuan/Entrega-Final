import express from "express";
import {Product} from "../../../Classes/Product.js";
import { dateFormatDMY, dateISOString } from "../../../Helpers/HelpersDatesFunctions.js";
export const prodRouter = express.Router();

prodRouter.use(express.json());
prodRouter.use(express.urlencoded({extended:true}));

const isAdmin = true;

export const productos = await new Product().getProducts()
    ? await new Product().getProducts() 
    : [];
console.log('productos: ',productos);

prodRouter.get('/',(req, res)=>{
    res.json({message:'test route'});
});

prodRouter.get('/listar/:id?', async (req, res)=>{
    try {
        let id = req.params.id;
        let prodArray = await new Product().getProducts();
        let prodFind = prodArray.find(prod => prod.id == id);
        if(id) {
            if (prodFind != null) {
                res.status(200).json({product: prodFind});
            } else {
                console.log('Error. Id inexistente');
                res.status(400).json('Error al listar producto');
            }
        } else {
            res.json({prodArray});
        }
    } catch {
        console.log('Error. Id inexistente');
        res.status(400).json('Error al listar producto');
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
        let id = productos.length + 1;
        let timestamp = dateISOString();
        let objProd = new Product(id,timestamp,bodyProd.name,bodyProd.desc,bodyProd.code,bodyProd.img,bodyProd.price,bodyProd.stock);
        productos.push(objProd);
        objProd.setProduct(productos);
        res.status(200).json({message:'Agregar producto'});
    } catch (error) {
        console.log('Error al obtener los productos del body', error);
        res.status(400).json('Error al grabar el producto');
    }
};

prodRouter.put('/actualizar/:id', (req, res)=>{
    isAdmin ? 
                actualizarProducto(req,res) 
            : 
                res.status(401).json({error : -1, descripcion: 'ruta producto/actualizar método PUT no autorizada'});
})

const actualizarProducto = async (req,res) => {   
        try{
            const id = req.params.id;
            const productIndex = productos.findIndex(x=>x.id == id);
            const productAttributes = Object.entries(req.body);
            productAttributes.forEach(x=>{
                let attr = x[0];
                let newValue = x[1];
                if(x !== null){
                    productos[productIndex][attr] = newValue
                }
            })
            await new Product().saveProduct(productos);
            res.status(200).json({modifiedProduct:productos[productIndex], allProducts:productos })
        }catch {
            res.status(400).json({error: 'Error al actualizar el producto'})
        }
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
        res.status(400).json('Error al borrar el producto');
    }
};