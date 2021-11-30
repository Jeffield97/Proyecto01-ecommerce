const express = require("express");
const VerifyToken = require("../middleware/authvalidation");
const Productos = require("../services/productos");

function productos(app)
{
    const router = express.Router()
    app.use("/productos",router)

    const productosService = new Productos()
    
    router.post("/",VerifyToken, async(request,respone)=>{
        const data = request.body
        const resultado = await productosService.createProducto(data)
        respone.status(201).json(resultado)})

    router.get("/",async(request,response)=>{
        const resultado= await productosService.getProductos()
        response.status(200).json(resultado)})
    
    router.get("/:id",async(request,response)=>{
        const id= request.params.id
        const resultado = await productosService.getProducto(id)
        response.status(200).json(resultado)
    })
        
    router.put("/:id",VerifyToken,async(request,response)=>{
        const id= request.params.id
        const data = request.body
        const resultado = await productosService.updateProducto(id,data)
        response.status(200).json(resultado)
    })
    router.delete("/:id",VerifyToken,async(request,response)=>{
        const id= request.params.id
        const resultado= await productosService.deleteProducto(id)
        response.status(200).json(resultado)})
}

module.exports = productos