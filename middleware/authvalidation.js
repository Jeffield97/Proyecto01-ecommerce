//Make a middleware to validate the token
const jwt = require('jsonwebtoken');
const config = require('../config');




const VerifyToken = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    else {
        try {
            const decoded = jwt.verify(token, config.secret);
            req.user = decoded;
        }
        catch (err) {
            return res.status(403).json({ message: "Unauthorized" });
        }
    }
    return next();
}

//Make a middleware to validate the token for rol editor
const VerifyEditorToken = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    else {
        try {
            const decoded = jwt.verify(token, config.secret);
            console.log(decoded);
           
            if (decoded.rol !== "editor" && decoded.rol !== "admin") {
                return res.status(403).json({ message: "Unauthorized token isn't valid" });
            }
            req.user = decoded;
        }
        catch (err) {
            return res.status(403).json({ message: "Unauthorized,error authentication token" });
        }
    }
    return next();
}

//Exports
module.exports = {VerifyToken, VerifyEditorToken};