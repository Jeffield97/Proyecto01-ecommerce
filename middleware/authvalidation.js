//Make a middleware to validate the token
const jwt = require('jsonwebtoken');
const config = require('../config');


const obtenerRol= (token,res,rol,next) => {
    if(!token){
        return res.status(401).json({"message":"No token provided"});
    } 
    else {
        const decoded = jwt.verify(token, config.secret);
        if(rol==="regular" && decoded.rol==="regular"){
            return next();
        }
        else if(rol==="editor" && decoded.rol==="editor" || decoded.rol==="admin"){
            return next();
        }
        else if(rol==="admin" && decoded.rol==="admin"){
            return next();
        }
        else{
            return res.status(401).json({"message":"No autosufficient permissions"});
        }
    }
}

const VerifyToken = (req, res, next) => {
    const  {token}  = req.cookies;
    return obtenerRol(token,res,"regular",next);
}

//Make a middleware to validate the token for rol editor

const VerifyEditorToken = (req, res, next) => {
    const  {token}  = req.cookies;
    return obtenerRol(token,res,"editor",next);
}

const VerifyAdminToken = (req, res, next) => {
    const  {token}  = req.cookies;
    return obtenerRol(token,res,"admin",next);
}

//Exports
module.exports = {VerifyToken, VerifyEditorToken,VerifyAdminToken};