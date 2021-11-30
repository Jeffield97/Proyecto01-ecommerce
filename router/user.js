const express = require("express");
const Usuarios = require("../services/user");

function usuarios(app) {
    const router = express.Router();
    app.use("/usuarios", router)

    const usuariosService = new Usuarios()

    router.post("/", async (request, response) => {
        try {
            const data = request.body;
            const result = await usuariosService.createUser(data);
            response.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    })

    router.get("/", async (request, response) => {
        try {
            const result = await usuariosService.getUsers();
            response.status(200).json(result);
        }
        catch (error) {
            console.log(error);
        }
    })

    router.get("/:id", async (request, response) => {
        try {
            const id = request.params.id;
            const result = await usuariosService.getUser(id);
            response.status(200).json(result);
        }
        catch (error) {
            console.log(error);
        }
    })

    router.delete("/:id", async (request, response) => {
        try {
            const id = request.params.id;
            const result = await usuariosService.deleteUser(id);
            response.status(200).json(result);
        }
        catch (error) {
            console.log(error);
        }
    })

    router.post("/login", async (request, response) => {

        try {
            const { user, email, password } = request.body
            const result = await usuariosService.login(email, password, user)
            if (result.success)
            {
                response.cookie("token",result.token,{httpOnly:true}).status(200).json({usuario:result.usuario.user})
            }
            else
            {
                response.status(404).json({mensaje:"Fallo al ingresar"})
            }
            //response.status(200).json();
            

        }
        catch (error) {
            console.log(error);
        }
    })
}

module.exports = usuarios;