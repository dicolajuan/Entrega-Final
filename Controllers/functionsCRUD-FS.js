import { Product } from "../Classes/Product.js";
import { dateISOString } from "../Helpers/HelpersDatesFunctions.js";

export const listarProductosFS = async (req, res) => {
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
};

export const agregarProductoFS = (req,res, productos) => {
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

export const actualizarProductoFS = async (req,res, productos) => {   
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

export const borrarProductoFS = (req,res, productos) => {
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

export const listarCarritoFS = async (req, res, carrito) => {
    let {idC, idP} = req.params;
    console.log('Estoy en listar FS carrito',carrito);
    if(idC){
        if(idP){
            let prod = carrito.productos.find(carProd => carProd.id == idP);
            if(prod != null){
                res.json({mensaje:`Listar el producto: ${idP} del carrito`, product:prod});
            } else {
                console.log('Error. Id inexistente');
                res.status(400).json('Error al listar carrito');
            }
        } else {
            res.json({message: `listar todos los productos del carrito`,carrito});
        }
    } else {
        console.log('Error. Id inexistente');
        res.status(400).json('Error al listar carrito');
    }

};

export const agregarCarritoFS = async (req,res, carrito) => {
    try {
        let product = await new Product().findProduct(req.params.idP);
        if (carrito.productos.find(e => e.id == req.params.idP) == null){
            product.cantidad = 1;
            carrito.productos.push(product);
            carrito.saveProduct();
            res.json(carrito);
        } else {
            let id = parseInt(req.params.idP);
            let indexObj = carrito.productos.map(e => {return e.id}).indexOf(id);
            carrito.productos[indexObj].cantidad += 1;
            carrito.saveProduct();
            res.json(carrito);
        }
        
    } catch {
        console.log('Error. Id inexistente en carrito');
        res.status(400).json('Error al agregar el producto al carrito');
    }
};

export const borrarCarritoFS = (req, res, carrito) => {
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
}