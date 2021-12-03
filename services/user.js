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

    async getUser(email) {
        try {
            const resultado = await UserModel.findOne({email}).exec();
            //console.log("Estes es el resultado",resultado);
            return resultado || false
            
        }
        catch (error) {

        }
    }

    async createUser(data) {
        try {
            const usuario_guardado = await UserModel.create(data);
            console.log("Estos son los usuarios guardados",usuario_guardado);
            return usuario_guardado || {}
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

    
}
module.exports = Usuarios;