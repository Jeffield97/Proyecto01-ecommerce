const {mongoose} = require('../config/db');
const Schema = mongoose.Schema;

const productosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es necesario']
    },
    descripcion: {
        type: String,
        required: false
    },
    imagen:{
        type: String,
        required: false
    },
});

 module.exports = mongoose.model('Productos', productosSchema);
//module.exports = productosSchema;