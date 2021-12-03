const express = require("express")
const productos = require("./router/productos")
const usuarios = require("./router/user") 
const auth=require("./router/auth")
const cookies= require("cookie-parser")

//Destructing
const {connection}= require("./config/db")
const app = express()



//Middleware

app.use(express.json())
app.use(cookies())
auth(app)
productos(app)
usuarios(app)

//Coneccion a DB
connection()

const server = app.listen(3000, () => {
    console.log("Server on port 3000")
})

process.on('unHandlerRejection',(err, promise)=>{
    console.log ("Error",err.message)
    server.close(()=>process.exit(1))
})