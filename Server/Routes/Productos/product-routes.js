import express from "express";
export const prodRouter = express.Router();

export const productos = [];


prodRouter.get('/',(req, res)=>{
    res.json({message:'test route'});
});

prodRouter.get('/listar/:id?', (req, res)=>{
    let id = req.params.id;
    if(id){
        res.json({message:`listar producto id: ${req.params.id}`});
    } else {
        res.json({message:'listar productos'});
    }
    
});

prodRouter.post('/agregar', (req, res)=>{
    res.json({message:'Agregar producto'});
});

prodRouter.put('/actualizar/:id', (req, res)=>{
    res.json({message:`actualizar producto id: ${req.params.id}`});
})

prodRouter.delete('/borrar/:id', (req, res)=>{
    res.json({message:`borrar producto id: ${req.params.id}`});
})

// module.exports = {prodRouter, productos}