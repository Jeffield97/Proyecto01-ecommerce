const {mongoose}=require('../config/db');
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
    {
        user:{
            type: String,
            require: [true, "El nombre es necesario"]
        },
        email:
        {
            type:String,
            require: [true,"Ingrese email"]
        },
        password:{
            type:String,
            require: [true,"Ingrese contraseña"]
        }

    }
)

module.exports = mongoose.model('Users',UsersSchema);