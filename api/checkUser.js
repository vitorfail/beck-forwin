const tabelas2 = require('../tabelas.js')
var jwt = require('jsonwebtoken');
var decode = require('jwt-decode')
require('dotenv').config();

module.exports = function (header){
    var h = header.headers.authorization.replace('Bearer ', '')
    var result = false
    jwt.verify(h, process.env.PRIVATE_KEY, function(err, decoded) {
        if (err){
            
        }
        else{
            result = true
        } 
    })
    return result    
};
