const dotenv = require('dotenv').config();
const config = {
    dev: process.env.MODE==="dev",
    port: process.env.PORT || 3000,
    password: process.env.DB_PASS,
    secret: process.env.JWT_PASS,
 }
 module.exports = config;