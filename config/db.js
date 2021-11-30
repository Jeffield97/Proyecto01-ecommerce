const config = require("./index.js")
const mongoose = require("mongoose");

const connection = async()=>{
    const conn = await mongoose.connect(`mongodb://Jeffield:${config.password}@sox-shard-00-01.cotz4.mongodb.net:27017/tienda?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=true`)
    console.log("Mongo DB connected",conn.connection.host)
    console.log("Password: ",config.password)
}
module.exports = {connection,mongoose};