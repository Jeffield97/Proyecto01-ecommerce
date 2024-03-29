const express = require("express");
const { VerifyAdminToken } = require("../middleware/authvalidation");
const Auth = require("../services/auth");

function auth(app) {
    const router = express.Router();
    app.use("/auth", router)

    const auth_service = new Auth()

   

    router.post("/login", async (request, response) => {

        try {
            const {email, password } = request.body
            const result = await auth_service.login(email, password)
            if (result.success)
            {
                response.cookie("token",result.token,{httpOnly:true}).status(200).json({usuario:result.usuario.user,rol:result.usuario.rol})
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
   
    router.post("/signup", async (request, response) => {

        try {
            const { user, email, password,rol } = request.body
            const result = await auth_service.register(email, password, user,rol)
            console.log(result.success)
            if (result.success)
            {
                response.status(200).json({usuario:result.usuario.user})
            }
            else
            {
                response.status(400).json({mensaje:"Fallo al registrar usuario en router"})
            }
            //response.status(200).json();
            

        }
        catch (error) {
            console.log(error);
        }
    })

    //Router for change rol by id
    router.put("/changeRol/:id",VerifyAdminToken, async (request, response) => {
        try {
            const { id } = request.params
            const { rol } = request.body
            const result = await auth_service.changeRole(id,{rol})
            console.log(result)
            if (result.success)
            {
                response.status(200).json({usuario:result.usuario.user})
            }
            else
            {
                response.status(400).json({mensaje:"Fallo al cambiar rol en router"})
            }
            //response.status(200).json();
            

        }
        catch (error) {
            console.log(error);
        }
    })
}

module.exports = auth;