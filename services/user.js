const UserModel = require("../schemas/user");
const users = new UserModel({ name: "UserModel" });
const config = require("../config/index");
//import jsonwebtoken
const jwt = require("jsonwebtoken");
class Usuarios {
    async getUsers() {
        try {
            const resultado = await UserModel.find();
            return resultado || {}
        }
        catch (error) {

        }
    }

    async getUser(id) {
        try {
            const resultado = await UserModel.findById(id);
            return resultado || {}
        }
        catch (error) {

        }
    }

    async createUser(data) {
        try {
            const resultado = await UserModel.create(data);
            return resultado || {}
        }
        catch (error) {

        }
    }

    async deleteUser(id) {

        try {
            const resultado = await UserModel.findByIdAndRemove(id);
            return resultado || {}
        }
        catch (error) {

        }
    }

    async login(email, password, user) {
        try {
            const usuario = await UserModel.findOne({ email }).exec()
            if (usuario)
            {
                if (usuario.password === password) 
                {
                    const token = jwt.sign({ email, user }, config.secret)
                    return { token, usuario,success:true };
                }
                else
                {
                    return {"message":"Contraseña incorrecta!",success:false}
                }
                
            }
            else
            {
                return {"message":"Correo no registrado!"}
            }
            
        }
        catch (error) {
            console.log(error)
        }
    }

}
module.exports = Usuarios;