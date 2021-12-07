const ProductoModel = require('../schemas/productos');
const productos = new ProductoModel({name:"producto"});
class Productos
{
    async getProductos()
    {
       try
       {
           const resultado = await ProductoModel.find();
           return resultado || [];
       }
       catch(error)
         {
             console.log(error);
         }
    }

    async getProducto(id)
    {
        const producto = await ProductoModel.findById(id);
        return producto || {};
    }

    async createProducto(data)
    {
        const producto = await ProductoModel.create(data)
        return producto || {};
    }

    async updateProducto(id,data)
    {
       const productUpdated = await ProductoModel.findByIdAndUpdate(id,data)
        return productUpdated || {};
    }

    async deleteProducto(id)
    {
        const producto = await ProductoModel.findByIdAndRemove(id);
        console.log("Producto eliminado")
        return producto || {};
    }
    async getPublicationsByUser(userId)
    {
        try
        {
            const productos=await ProductoModel.find({author:userId});
            return productos;
        }
        catch(error)
        {
            console.log(error);
        }
    }

}

module.exports = Productos;