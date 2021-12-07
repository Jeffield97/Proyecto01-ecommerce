//Make a middleware to validate the token
const jwt = require('jsonwebtoken');
const config = require('../config');


const obtenerRol= (token,res,req,rol,next) => {
    if(!token){
        return res.status(401).json({"message":"No token provided"});
    } 
    else {
        const decoded = jwt.verify(token, config.secret);
        req.id=decoded;
        if(rol==="regular" && decoded.rol==="regular"){
            //req.id=decoded;
            return next();
        }
        else if(rol==="editor" && decoded.rol==="editor" || decoded.rol==="admin"){
            //req.id=decoded;
            return next();
        }
        else if(rol==="admin" && decoded.rol==="admin"){
            //req.id=decoded;
            return next();
        }
        else{
            return res.status(401).json({"message":"No autosufficient permissions"});
        }
    }
}

const VerifyToken = (req, res, next) => {
    const  {token}  = req.cookies;
    return obtenerRol(token,res,req,"regular",next);
}

//Make a middleware to validate the token for rol editor

const VerifyEditorToken = (req, res, next) => {
    const  {token}  = req.cookies;
    return obtenerRol(token,res,req,"editor",next);
}

const VerifyAdminToken = (req, res, next) => {
    const  {token}  = req.cookies;
    return obtenerRol(token,res,req,"admin",next);
}

//Exports
module.exports = {VerifyToken, VerifyEditorToken,VerifyAdminToken};