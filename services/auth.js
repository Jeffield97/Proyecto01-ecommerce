const jwt = require('jsonwebtoken');
const Usuarios = require('./user');
const config = require('../config');

class Auth {
    usuarios = new Usuarios();

    async login(email, password) {

        try {
           const usuario = await this.usuarios.getUser(email);
           //console.log(usuario)
            if (usuario) {
                if (usuario.password === password) {
                    const token = jwt.sign({ email, rol:usuario.rol }, config.secret)
                    return { token, usuario, success: true };
                }
                else {
                    return { "message": "Contraseña incorrecta!", success: false }
                }

            }
            else {
                return { "message": "Correo no registrado!" }
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    async register(email, password,user,rol) {
      
        try {
            const usuario= await this.usuarios.createUser({email, password,user,rol});
            //console.log(usuario)
            if (usuario) {
               return { usuario,message: "Usuario registrado!", success: true }
            }
            else {
                return { "message": "Fallo al registrar usuario en services" }
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    // change role to users from id
    async changeRole(id,rol) {
        try {
            console.log(id,rol)
            const usuario = await this.usuarios.updateUser(id,rol);
            console.log(usuario)
            if (usuario) {
                return { usuario, message: "Rol cambiado!", success: true }
            }
            else {
                return { "message": "Fallo al cambiar rol en services" }
            }

        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = Auth;