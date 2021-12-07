const express = require("express");
const { VerifyToken, VerifyEditorToken, VerifyAdminToken } = require("../middleware/authvalidation");
const Productos = require("../services/productos");
const config = require("../config");
const jwt = require("jsonwebtoken");

function productos(app) {
    const router = express.Router()
    app.use("/productos", router)

    const productosService = new Productos()

    router.post("/", VerifyEditorToken, async (request, respone) => {
        const data = request.body
        const {id}=request.id
        data.author=id
        //console.log("Esta es la data del body:  ",data)
        const resultado = await productosService.createProducto(data)
        respone.status(201).json(resultado)
    })

    router.get("/", VerifyEditorToken, async (request, response) => {
        const resultado = await productosService.getProductos()
        response.status(200).json(resultado)
    })

    router.get('/my_products',VerifyEditorToken, async (req, res) => {
        try {
            //const user_author = getUserFromToken(req);
            const {id} = req.id;
            console.log("Id de usuario:",id);
            //const decoded = jwt.verify(token, config.secret)
            //console.log(decoded.id);
            //const user = await usersService.getUser(email);
            //console.log(user.id);
            const products = await productosService.getPublicationsByUser(id);
            console.log(products);
            res.status(200).json(products);
        }
        catch (err) {
            res.status(400).json({
                error: err.message
            });

        }
    });


    router.get("/:id", async (request, response) => {
        const id = request.params.id
        const resultado = await productosService.getProducto(id)
        response.status(200).json(resultado)
    })

    router.put("/:id", VerifyToken, async (request, response) => {
        const id = request.params.id
        const data = request.body
        const resultado = await productosService.updateProducto(id, data)
        response.status(200).json(resultado)
    })
    router.delete("/:id", VerifyToken, async (request, response) => {
        const id = request.params.id
        const resultado = await productosService.deleteProducto(id)
        response.status(200).json(resultado)
    })
}

module.exports = productos