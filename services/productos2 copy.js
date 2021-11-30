const ProductoModel = require('../models/productos');
const producto = new ProductoModel({ name: "producto" });
class Productos {
    async getProductos(req, res) {
        try {
            const resultado = await ProductoModel.find();
            res.json(resultado);
        }
        catch (error) {
            res.json({
                'status': 'Error'
            });
        }
    }

    async getProducto(req, res) {
        const producto = await ProductoModel.findById(req.params.id);
        res.json(producto);
    }

    async createProducto(req, res) {
        try {
            const producto = await ProductoModel.create({ nombre, precio, descripcion, categoria });
            res.json({
                'status': 'Producto creado'
            });
        }
        catch (error) {
            res.json({
                'status': 'Error'
            });
        }

    }

    async updateProducto(req, res) {
        try {
            await Producto.findByIdAndUpdate(req.params.id, { nombre, precio, descripcion, categoria });
            res.json({
                'status': 'Producto actualizado'
            });
        }
        catch (error) {
            res.json({
                'status': 'Error'
            });
        }
    }
    async deleteProducto(req, res) {
        try {
            await Producto.findByIdAndRemove(req.params.id);
            res.json({
                'status': 'Producto eliminado'
            });
        }
        catch (error) {
            res.json({
                'status': 'Error'
            });
        }
    }

}