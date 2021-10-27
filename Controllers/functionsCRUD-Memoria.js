//FALTA REALIZAR SOLO MEMORIA. POR AHORA NO ESTOY INTERESADO EN HACERLO, SOLO EN EL CASO QUE ME SOBRE TIEMPO

// import { dateISOString } from "../Helpers/HelpersDatesFunctions.js";

// export const listarProductosMemoria = async (req, res) => {
//     let id = req.params.id;
//     let prodArray = await new Product().getProducts();
//     let prodFind = prodArray.find(prod => prod.id == id);
//     if(id) {
//         if (prodFind != null) {
//             console.log("vamo bien");
//             res.status(200).json({product: prodFind});
//         } else {
//             console.log('Error. Id inexistente');
//             res.status(400).json('Error al listar producto');
//         }
//     } else {
//         res.json({prodArray});
//     }
// };

// export const agregarProductoMemoria = (req,res, productos) => {
//     try {
//         let bodyProd = req.body;
//         let id = productos.length + 1;
//         let timestamp = dateISOString();
//         let objProd = new Product(id,timestamp,bodyProd.name,bodyProd.desc,bodyProd.code,bodyProd.img,bodyProd.price,bodyProd.stock);
//         productos.push(objProd);
//         objProd.setProduct(productos);
//         res.status(200).json({message:'Agregar producto'});
//     } catch (error) {
//         console.log('Error al obtener los productos del body', error);
//         res.status(400).json('Error al grabar el producto');
//     }
// };

// export const actualizarProductoMemoria = async (req,res, productos) => {   
//     try{
//         const id = req.params.id;
//         const productIndex = productos.findIndex(x=>x.id == id);
//         const productAttributes = Object.entries(req.body);
//         productAttributes.forEach(x=>{
//             let attr = x[0];
//             let newValue = x[1];
//             if(x !== null){
//                 productos[productIndex][attr] = newValue
//             }
//         })
//         await new Product().saveProduct(productos);
//         res.status(200).json({modifiedProduct:productos[productIndex], allProducts:productos })
//     }catch {
//         res.status(400).json({error: 'Error al actualizar el producto'})
//     }
// };

// export const borrarProductoMemoria = (req,res, productos) => {
//     try{
//         console.log(req.params.id);
//         let objFind = productos.filter((e) => e.id != req.params.id);
//         productos.splice(0, productos.length, ...objFind);
//         res.status(200).json(productos);
//     } catch {
//         console.log('Error. Id inexistente');
//         res.status(400).json('Error al borrar el producto');
//     }
// };