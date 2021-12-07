const jwt = require('jsonwebtoken');
const Usuarios = require('./user');
const config = require('../config');
const bcrypt = require('bcrypt');

class Auth {
    usuarios = new Usuarios();

    //hash -> encryp password
    async hash(password_shash) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password_shash, salt);
    }

    //verify password
    async verifyPassword(password, password_shash) {
        return await bcrypt.compare(password, password_shash);
    }

    async login(email, password) {

        try {
           const usuario = await this.usuarios.getUser(email);
           //console.log(usuario)
            if (usuario) {
                const verify = await this.verifyPassword(password, usuario.password);
                if (verify ) {
                    const token = jwt.sign({ email, rol:usuario.rol,id:usuario.id }, config.secret)
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

    async register(email, password_shash,user,rol) {
      
        try {
            //hash password}
            const password = await this.hash(password_shash);
            //console.log("Password hash:",password)
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